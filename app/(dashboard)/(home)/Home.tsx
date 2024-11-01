import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import colors from '@/constants/colors'
import CustomHeader from '@/components/CustomHeader'
import CustomCard from '@/components/CustomCard'
import { ActiveSubject, useOnboarding } from '@/context/onboardingContext'
import { getSubjectsByGradeAndSchool } from '@/utils'
import { Href, router } from 'expo-router'

const Home = () => {
  const {gradeRange, schoolLevel, setActiveSubject} = useOnboarding();
  const resultSubjects = getSubjectsByGradeAndSchool(gradeRange, schoolLevel);

  const onRedirectHandler = ({subjectName, subjectId}: {subjectName: string, subjectId: string}) => {
    setActiveSubject!({subjectName, subjectId} as ActiveSubject)
    router.push(`/(dashboard)/subject/${subjectId}/Options` as Href)
  }

  return (
    <SafeAreaView style={{backgroundColor: colors.PRIMARY}} className='flex h-full w-full'>
      <CustomHeader 
        title='Hello Muzi'
        showBackButton={false}
      />
      <ScrollView className='h-full p-3'>
        <View className='flex items-center justify-center'>
          {resultSubjects!.map((subject) => (
            <CustomCard 
              key={subject.id} 
              label={subject.subject}
              onPressAction={() => {onRedirectHandler({subjectName: subject.subject, subjectId: subject.id})}} 
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Home