import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router';
import { useOnboarding } from '@/context/onboardingContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomHeader from '@/components/CustomHeader';
import colors from '@/constants/colors';

const Quiz = () => {
  const {id} = useLocalSearchParams<{id:string}>();
  const {activeSubject} = useOnboarding();

  return (
    <SafeAreaView style={{backgroundColor: colors.PRIMARY}} className='flex h-full w-full'>
      <CustomHeader  
          title='Homework'
          subtitle={activeSubject?.subjectName}
          showBackButton={true}
          headerStyles='pr-3'
      />
    </SafeAreaView>
  )
}

export default Quiz
