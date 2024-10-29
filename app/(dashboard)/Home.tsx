import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import colors from '@/constants/colors'
import CustomHeader from '@/components/CustomHeader'
import CustomCard from '@/components/CustomCard'
import { useOnboarding } from '@/context/onboardingContext'
import { getSubjectsByGradeAndSchool } from '@/utils'

const Home = () => {
  const {gradeRange, schoolLevel} = useOnboarding();
  const resultSubjects = getSubjectsByGradeAndSchool(gradeRange, schoolLevel);
  return (
    <SafeAreaView style={{backgroundColor: colors.PRIMARY}} className='flex h-full w-full'>
      <CustomHeader />
      <ScrollView className='h-full p-3'>
        <View className='flex items-center justify-center'>
          {resultSubjects!.map((subject) => (
            <CustomCard 
              key={subject.id} 
              label={subject.subject}
              onPressAction={() => {console.log({subject})}} 
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Home