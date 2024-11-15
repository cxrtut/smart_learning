import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { useOnboarding } from '@/context/onboardingContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomHeader from '@/components/CustomHeader';
import colors from '@/constants/colors';

const Quiz = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { activeSubject } = useOnboarding();

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const questions = [
    {
      question: 'What is the capital of France?',
      options: ['Paris', 'London', 'Berlin', 'Rome'],
      correctAnswer: 'Paris',
    },
    {
      question: 'What is the largest planet in our solar system?',
      options: ['Earth', 'Saturn', 'Jupiter', 'Uranus'],
      correctAnswer: 'Jupiter',
    },
    {
      question: 'What is the capital city of South Africa?',
      options: ['Durban', 'Cape Town', 'Pretoria', 'Johannesburg'],
      correctAnswer: 'Pretoria',  
    },
  ];

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    if (answer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
    setSelectedAnswer(null); // Reset the selected answer for the next question
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(null); // Reset selected answer when going back
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: colors.PRIMARY }} className='flex h-full w-full'>
      <CustomHeader
        title='Quiz'
        subtitle={activeSubject?.subjectName}
        showBackButton={true}
        headerStyles='pr-3'
      />
      {showResult ? (
        <View className='mt-9'>
          <Text className="text-2xl mb-5 text-black">Quiz Result:</Text>
          <Text className="text-2xl mb-5 text-black">
            You scored {score} out of {questions.length}
          </Text>
          <TouchableOpacity
            className="bg-[#5470FD] p-2 rounded mt-5 items-center"
            onPress={handleRestart}
          >
            <Text className="text-black text-lg">Restart Quiz</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View className='mt-60 p-5'>
          <Text className="text-2xl mb-5 text-black">
            {questions[currentQuestion].question}
          </Text>
          <View className="p-5 rounded">
            {questions[currentQuestion].options.map((option, index) => (
              <TouchableOpacity
                key={index}
                className={`p-2 rounded mb-2 items-center ${selectedAnswer === option ? (option === questions[currentQuestion].correctAnswer ? 'bg-green-500' : 'bg-red-500') : 'bg-white'}`}
                onPress={() => handleAnswer(option)}
                disabled={selectedAnswer !== null} // Disable if an answer has been selected
              >
                <Text className="text-black-500 text-lg">{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View className="flex-row justify-between mt-5">
            <TouchableOpacity
              onPress={handlePrevious}
              disabled={currentQuestion === 0} // Disable if it's the first question
              className="bg-[#5470FD] p-2 rounded items-center flex-1 mr-2"
            >
              <Text className="text-black text-lg">Previous</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleNext}
              disabled={selectedAnswer === null} // Enable only if an answer is selected
              className="bg-[#5470FD] p-2 rounded items-center flex-1 ml-2"
            >
              <Text className="text-black text-lg">Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Quiz;