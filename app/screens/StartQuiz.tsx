import { View, Text, Pressable, Image } from 'react-native'
import React from 'react'
import { router } from 'expo-router'

const StartQuiz = () => {
  return (
    <View className='flex-1 items-center justify-center p-6'>
        <Image
            source={require('@/assets/images/splash.png')}
            className='h-3/6'
            style={{aspectRatio: 1}}
        />
        <Text className='text-2xl text-center text-purple-600 mb-5'>Instructions</Text>
        <View className='bg-purple-500 rounded p-7 items-center justify-center'>
            <Text className='text-white text-lg'>
                Each Quiz Has Four Options Quiz
            </Text>
            <Text className='text-white text-lg'>
                Progress will be shown at the top
            </Text>
            <Text className='text-white text-lg'>
                Score will be shown at the end.
            </Text>
        </View>

        <Pressable 
            className='bg-purple-500 mt-10 px-6 py-3 rounded-full w-1/2'
            onPress={() => router.push('/screens/Questions')}
        >
            <Text className='text-white text-center text-lg'>Start Quiz</Text>
        </Pressable>
    </View>
  )
}

export default StartQuiz