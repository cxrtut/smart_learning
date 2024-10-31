import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import colors from '@/constants/colors'

const Profile = () => {
  return (
    <SafeAreaView style={{backgroundColor: colors.PRIMARY}} className=' w-full h-full flex items-center'>
      <Text>Profile</Text>
    </SafeAreaView>
  )
}

export default Profile