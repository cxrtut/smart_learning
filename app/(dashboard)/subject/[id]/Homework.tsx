import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import colors from '@/constants/colors'

const Homework = () => {
  return (
    <SafeAreaView style={{backgroundColor: colors.PRIMARY}} className='flex h-full w-full'>
      <Text>Homework</Text>
    </SafeAreaView>
  )
}

export default Homework