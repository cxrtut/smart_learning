import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import colors from '@/constants/colors'
import CustomHeader from '@/components/CustomHeader'
import { useLocalSearchParams } from 'expo-router'
import { useOnboarding } from '@/context/onboardingContext'

const Course = () => {
  const {id} = useLocalSearchParams<{id:string}>();
  const {activeSubject} = useOnboarding();

  return (
    <SafeAreaView style={{backgroundColor: colors.PRIMARY}} className='flex h-full w-full'>
      <CustomHeader  
          title='Smart Learning'
          subtitle={activeSubject?.subjectName}
          showBackButton={true}
          headerStyles='pr-3'
      />
    </SafeAreaView>
  )
}

export default Course