import { View, Text, Pressable, Alert, ActivityIndicator, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { RelativePathString, router, useLocalSearchParams } from 'expo-router'
import ProgressBar from '@/components/ProgressBar'
import OpenAI from "openai";

const Questions = () => {

    const {subjectName, topic, id} = useLocalSearchParams()

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [score, setScore] = useState(0)
    const [selectedOption, setSelectedOption] = useState<string | null>(null)
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
    const [isloading, setIsLoading] = useState(true)
    const [error, setError] = useState(false)
    const [questions, setQuestions] = useState<{ question: string; options: string[]; correctAnswer: string }[]>([])
    


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

    const length = questions.length
    console.log({length})

    const progress = (currentQuestionIndex + 1) / (questions.length)
    console.log({currentQuestionIndex})
    console.log({progress})

    const handleNext = () => {
        if(currentQuestionIndex === questions.length - 1) {
            router.push({
                pathname: `/subject/${id}/Score` as RelativePathString,
                params: {score: score, subjectName: subjectName, topic: topic}
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
                    style={{
                        height: "50%",
                        resizeMode: "contain",
                        aspectRatio: 1,
                    }}
                />
                <Text className='text-lg mt-2 text-[#5470FD]'>
                    Failed to generate quiz questions
                </Text>
                <TouchableOpacity 
                    className='bg-[#5470FD] p-4 mt-4 rounded-full w-full'
                    onPress={() => {
                        router.dismissAll()
                        router.push(`/subject/${id}/SelectTopic` as RelativePathString)
                    }}
                >
                    <Text className='text-white text-center text-md font-bold'>
                        Try Again
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View style={{marginTop: 8, padding: 16}}>
            <View style={{flexDirection: 'row', marginBottom: 16}}>
                <ProgressBar
                    progress={progress}
                    height={25}
                    padded
                />
            </View>
            <Text className='text-2xl mb-2 mt-2'>
                {questions[currentQuestionIndex].question}
            </Text>
            {
                questions[currentQuestionIndex].options.map((option, index) => (
                    console.log({option, selectedOption, isCorrect}),
                    <TouchableOpacity
                        key={index}
                        disabled={!!selectedOption}

                        style={{
                            padding: 16,
                            borderRadius: 6,
                            borderWidth: 1,
                            marginTop: 8,
                            marginBottom: 8,
                            borderColor: selectedOption === option 
                                ? isCorrect 
                                    ? '#10b981'
                                    : '#ef4444'
                                : '#5470FD',
                            backgroundColor: selectedOption === option 
                                ? isCorrect 
                                    ? '#d1fae5'
                                    : '#fecaca'
                                : 'white'
                        }}
                        onPress={() => handleOptionPress(option)}
                    >   
                        <Text className='text-md'>{option}</Text>
                    </TouchableOpacity>
                ))
            }

            <TouchableOpacity 
                onPress={handleNext}
                className='bg-[#5470FD] p-4 rounded-md mt-6'
                style={{padding: 16, borderRadius: 6, backgroundColor: '#5470FD'}}
            >
                <Text style={{color: 'white', fontSize: 18, lineHeight: 28, textAlign: 'center', fontWeight: '700'}}>
                    {currentQuestionIndex === questions.length - 1 ? 'Finish' : 'Next'}
                </Text>
            </TouchableOpacity>
        </View>
    )
}



export default Questions