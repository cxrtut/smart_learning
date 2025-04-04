import { View, Text, Pressable, Alert, Animated, ActivityIndicator, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { techQuizQuestions } from '@/config/questions'
import { router } from 'expo-router'
import ProgressBar from '@/components/ProgressBar'
import OpenAI from "openai";

const Questions = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [score, setScore] = useState(0)
    const [selectedOption, setSelectedOption] = useState<string | null>(null)
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
    const [quizProgress, setQuizProgress] = useState(techQuizQuestions.length)
    const [isloading, setIsLoading] = useState(true)
    const [error, setError] = useState(false)
    const [questions, setQuestions] = useState<{ question: string; options: string[]; correctAnswer: string }[]>([])

    const topic = 'technology'

    useEffect(() => {
        const openai = new OpenAI({
            apiKey: process.env.EXPO_PUBLIC_OPENAI_API_KEY,
        });

        const generateQuiz = async () => {
            setIsLoading(true)
            try {
                const response = await openai.chat.completions.create({
                    model: "gpt-3.5-turbo",
                    messages: [
                        {
                            role: "system",
                            content: "You are an assistant that generates quiz questions.",
                        },
                        {
                            role: "user",
                            content: `Create a multiple-choice quiz on the ${topic} technology. Provide exactly 4 questions, each with 4 answer options and a correct answer. Return the result in a JSON array format where each object has this structure: { "question": "string", "options": ["string", "string", "string", "string"], "correctAnswer": "string" }.`,
                        },
                    ],
                    max_tokens: 500,
                })

                const content = response.choices[0]?.message?.content;
                if(!content) {
                    setError(true)
                    // Alert.alert('Error', 'Failed to generate quiz questions')
                } else {
                    const parsedQuestions = JSON.parse(content as string)
                    
                    if(!parsedQuestions) {
                        setError(true)
                        Alert.alert('Error', 'Failed to generate quiz questions')
                    }

                    if (
                        Array.isArray(parsedQuestions) &&
                        parsedQuestions.every(
                          (q) =>
                            q.question &&
                            Array.isArray(q.options) &&
                            q.options.length === 4 &&
                            typeof q.correctAnswer === "string"
                        )
                      ) {
                        setQuestions(parsedQuestions)
                      } else {
                        setError(true)
                        Alert.alert('Error', 'Invalid data format from OpenAI')
                      }
                }
            } catch (error: any) {
                setError(true)
                console.log("Error: ", error)
                Alert.alert('Error', error.message)
            } finally {
                setIsLoading(false)
            }
        }

        generateQuiz()
    }, [])

    const progress = (currentQuestionIndex + 1) / quizProgress

    const handleNext = () => {
        if(currentQuestionIndex === techQuizQuestions.length - 1) {
            router.push({
                pathname: '/screens/Score',
                params: {score: score}
            })
        } else {
            setCurrentQuestionIndex(currentQuestionIndex + 1)
            setSelectedOption(null)
            setIsCorrect(null)
        }
    }

    const handleOptionPress = (pressedOption: string) => {
        console.log(pressedOption)
        setSelectedOption(pressedOption)

        const isAnswerCorrect = questions[currentQuestionIndex].correctAnswer === pressedOption

        setIsCorrect(isAnswerCorrect)

        if (isAnswerCorrect) {
            setScore((prevScore) => prevScore + 10)
        }
    }

    if(isloading) {
        return (
            <View className='flex-1 justify-center items-center'>
                <ActivityIndicator size='large' color='purple' />
            </View>
        )
    }

    if(error) {
        return (
            <View className='flex-1 justify-center items-center p-5'>
                <Image
                    source={require('@/assets/images/error_image.png')}
                    className='h-3/6'
                    style={{aspectRatio: 1}}
                />
                <Text className='text-lg mt-2 text-purple-500'>
                    Failed to generate quiz questions
                </Text>
                <Pressable 
                    className='bg-purple-500 p-4 mt-4 rounded-full w-full'
                    onPress={() => router.push('/')}
                >
                    <Text className='text-white text-center text-md font-bold'>
                        Try Again
                    </Text>
                </Pressable>
            </View>
        )
    }

    return (
        <View className='mt-2 p-4'>
            <View className='flex-row mb-4'>
                <ProgressBar
                    progress={progress}
                    height={25}
                    outerBackgroundColor='purple-500'
                    innerBackgroundColor='gray-500'
                    padded
                />
            </View>
            <Text className='text-2xl mb-2'>
                {questions[currentQuestionIndex].question}
            </Text>
            {
                questions[currentQuestionIndex].options.map((option, index) => (
                    <Pressable 
                        key={index}
                        onPress={() => handleOptionPress(option)}
                        className={`border-purple-500 border p-4 my-2 rounded-md ${
                            selectedOption === option 
                            ? isCorrect 
                                ? 'border-green-500 bg-green-200'
                                : 'border-red-500 bg-red-200'
                                : 'border-purple-500'
                        }`}
                        disabled={!!selectedOption}
                    >
                        <Text className='text-md'>{option}</Text>
                    </Pressable>
                ))
            }

            <Pressable 
                onPress={handleNext}
                className='bg-purple-500 p-4 rounded-md mt-6'
            >
                <Text className='text-white text-lg text-center font-bold'>
                    {currentQuestionIndex === techQuizQuestions.length - 1 ? 'Finish' : 'Next'}
                </Text>
            </Pressable>
        </View>
    )
}

export default Questions