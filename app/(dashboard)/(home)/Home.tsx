import { View, Text, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import colors from '@/constants/colors'
import CustomHeader from '@/components/CustomHeader'
import CustomCard from '@/components/CustomCard'
import { ActiveSubject, useOnboarding } from '@/context/onboardingContext'
import { getSchoolLevelandGradeRange, getSubjectsByGradeAndSchool } from '@/utils'
import { Href, router } from 'expo-router'
import { useUser } from '@clerk/clerk-expo'
import { fetchAPI, useFetch } from '@/lib/fetch'

const Home = () => {
  const testGrade = '1';
  const testSchool = '1';
  const {user} = useUser();
  const {gradeRange, schoolLevel, setActiveSubject, setSchoolLevel, setGradeRange} = useOnboarding();
  const resultSubjects = getSubjectsByGradeAndSchool(testGrade, testSchool);


  useEffect(()  => {
    if (!user) {
      router.push('/(auth)/SignIn' as Href)
    }

    const fetchData = async () => {
      const data = await fetchAPI('/(api)/(onboarding)/get')

      if(data.data[0].user_id !== user?.id) {
        console.log("Current user")
      }
      
      console.log("Data from fetch", data.data[0]);

      setSchoolLevel(data.data[0].school_level)
      setGradeRange(data.data[0].grade_range)
      console.log({gradeRange, schoolLevel})
    }
    fetchData()
    
  }, [])

  const onRedirectHandler = ({subjectName, subjectId}: {subjectName: string, subjectId: string}) => {
    setActiveSubject!({subjectName, subjectId} as ActiveSubject)
    router.push(`/(dashboard)/subject/${subjectId}/Options` as Href)
  }

  return (
    <SafeAreaView style={{backgroundColor: colors.PRIMARY}} className='flex h-full w-full'>
      <CustomHeader 
        title={`Hello ${user?.fullName!}`}
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