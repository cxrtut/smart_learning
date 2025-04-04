import { View, Text, Image, Pressable } from 'react-native'
import React from 'react'
import { router, useLocalSearchParams } from 'expo-router'

const Score = () => {
  const { score } = useLocalSearchParams()
  return (
    <View className='flex-1 items-center p-6'>
      <Image
          source={require('@/assets/images/score_image.png')}
          className='h-3/6'
          style={{aspectRatio: 1}}
      />
      <Text className='text-lg mt-2 text-purple-500'>
        Congradulations!! You Scored {score} ponts
      </Text>
      <Pressable 
        className='bg-purple-500 p-4 mt-4 rounded-full w-full'
        onPress={() => router.push('/')}
      >
        <Text className='text-white text-md text-center font-bold'>
          Play Again
        </Text>
      </Pressable>
    </View>
  )
}

export default Score