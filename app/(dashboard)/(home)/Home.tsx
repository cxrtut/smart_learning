import { View, Text, ScrollView, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
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
  const {user} = useUser();
  const {
    gradeRange, 
    schoolLevel, 
    setActiveSubject, 
    setSchoolLevel, 
    setGradeRange
  } = useOnboarding();

  const [loading, setLoading] = useState(true)
  let resultSubjects = getSubjectsByGradeAndSchool(gradeRange, schoolLevel)


  useEffect(()  => {
    if (!user) {
      router.push('/(auth)/SignIn' as Href)
    }

    const fetchData = async () => {
      try {
        const data = await fetchAPI(`/(api)/(onboarding)/${user?.id}`)
        setGradeRange(data.data[0].grade_range)
        setSchoolLevel(data.data[0].school_level)
      } catch (error) {
      } finally {
        setLoading(false)
      }
    }

    fetchData()
    
  }, [user, router, setGradeRange, setSchoolLevel])

  if (loading) {
    return (
      <SafeAreaView style={{backgroundColor: colors.PRIMARY}} className='flex h-full w-full'>
        <CustomHeader 
          title={`Hello ${user?.firstName!}`}
          showBackButton={false}
        />
        <View className='flex-1 items-center justify-center'>
          <ActivityIndicator size='large' color="#fff" />
        </View>
      </SafeAreaView>
    )
  }

  const onRedirectHandler = ({subjectName, subjectId}: {subjectName: string, subjectId: string}) => {
    setActiveSubject!({subjectName, subjectId} as ActiveSubject)
    router.push(`/(dashboard)/subject/${subjectId}/Options` as Href)
  }

  return (
    <SafeAreaView style={{backgroundColor: colors.PRIMARY}} className='flex h-full w-full'>
      <CustomHeader 
        title={`Hello ${user?.firstName!}`}
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