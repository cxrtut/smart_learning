import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { router } from 'expo-router'
import colors from '@/constants/colors'
import { SafeAreaView } from 'react-native-safe-area-context'

const SplashScreen = () => {
  return (
    <SafeAreaView style={{backgroundColor: colors.PRIMARY}} className='flex h-full items-center justify-between py-3 pb-10'>
      <View className='flex items-start w-full'>
        <Text 
          className='text-start p-3 pl-5 font-semibold text-white text-2xl'
        >
          Smart Learning
        </Text>
      </View>

      <View className='flex items-center mt-[95%]'>
        <Text 
          className='text-center text-white text-2xl px-7 font-bold'
        >
          Learn Any Thing Any Time Any Where
        </Text>
        <Text
          className='text-center text-white text-xs mt-3 px-7'
        >
          Learning just a click away, Online learning is education that takes place over the internet.
        </Text>
      </View>

      <TouchableOpacity
        className='flex items-center justify-center bg-white px-4 p-4 rounded-full mt-[-5%] w-[70%]' 
        onPress={() => {
          router.push('/(auth)/SignIn')
        }}
      >
        <Text
          style={{color: colors.PRIMARY}}
          className='font-bold text-lg'
        >
          Get Started
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default SplashScreen