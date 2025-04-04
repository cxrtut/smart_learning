import { View, Text } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { router } from 'expo-router'


const CustomHeader = ({
  title, 
  subtitle,
  showBackButton,
  headerStyles
}: {
  title: string, 
  subtitle?: string, 
  showBackButton: boolean
  headerStyles?: string
}) => {

  return (
    <View className={`w-full items-center flex ${headerStyles}`}>
      <View className='w-full items-center justify-between flex flex-row py-2 px-3'>
        <View className='flex flex-col'>
          <Text className='ml-3 text-2xl font-light text-gray-900'>
            {title}
          </Text>
          {subtitle && 
            (
            <Text className='ml-4 text-gray-500 text-xs'>
              {subtitle}
            </Text>
          )}
        </View>
        {showBackButton && (
          <TouchableOpacity onPress={() => {router.back()}}>
            <Ionicons name='chevron-back-outline' size={30} color='gray' />
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

export default CustomHeader