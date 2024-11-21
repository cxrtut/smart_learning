import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import colors from '@/constants/colors'
import { useOAuth, useSignIn, useClerk } from '@clerk/clerk-expo'
import CustomButton from '@/components/CustomButton'

const Profile = () => {
  const { user, openUserProfile, redirectToAfterSignOut, signOut } = useClerk()
  return (
    <SafeAreaView style={{backgroundColor: colors.PRIMARY}} className=' w-full h-full flex items-center'>
      <Text>Profile</Text>
      <CustomButton
        title='Sign Out'
        className="w-[70%] mt-[25%] shadow-none bg-white"
        bgVariant="outline"
        textVariant="secondary"
        onPress={() => signOut()}
      />
    </SafeAreaView>
  )
}

export default Profile