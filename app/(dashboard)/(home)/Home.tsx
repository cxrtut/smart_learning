import { View, Text, ScrollView, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import colors from '@/constants/colors'
import CustomHeader from '@/components/CustomHeader'
import CustomCard from '@/components/CustomCard'
import { ActiveSubject, useOnboarding } from '@/context/onboardingContext'
import { getSubjectsByGradeAndSchool } from '@/utils'
import { Href, router } from 'expo-router'
import { useUser } from '@clerk/clerk-expo'
import { fetchAPI, useFetch } from '@/lib/fetch'
import { images } from '@/constants'



const Home = () => {
  const {user} = useUser();
  const name = "John Doe"

  const {
    gradeRange, 
    schoolLevel, 
    setActiveSubject, 
    setSchoolLevel, 
    setGradeRange
  } = useOnboarding();

  const [loading, setLoading] = useState(true)
  const [resultSubjects, setResultSubjects] = useState<{ subject_name: string; subject_id: string; }[]>([]);


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

  useEffect(() => {
    // Ensure gradeRange and schoolLevel are set before running this useEffect
    if (!gradeRange || !schoolLevel) return;
  
    const loadSubjects = async () => {
      setLoading(true);
      try {
        const data = await getSubjectsByGradeAndSchool(gradeRange, schoolLevel);
        setResultSubjects(data);
      } catch (error) {
        console.error("Error loading subjects:", error);
      } finally {
        setLoading(false);
      }
    };
  
    loadSubjects();
  }, [gradeRange, schoolLevel])

  if (loading) {
    return (
      <SafeAreaView style={{backgroundColor: colors.PRIMARY}} className='flex h-full w-full'>
        <CustomHeader 
          title={`Hello ${name}`}
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
        title={`Hello ${user?.firstName}`}
        showBackButton={false}
      />
      <ScrollView className='h-full p-5 pb-3'>
        <View className='flex items-center justify-center pb-3'>
          {resultSubjects!.map((subject: any) => (
            <CustomCard 
              key={subject.subject_id}
              headerImage={images.bg_3} 
              headingStyle='text-xl'
              subTitle='Find more about services for your subject'
              label={subject.subject_name}
              onPressAction={() => {
                const subject_name = subject.subject_name
                const subject_id = subject.subject_id
                // console.log({subject_id, subject_name})
                onRedirectHandler({subjectName: subject_name, subjectId: subject_id})
              }} 
            />
          ))}
        </View>
      </ScrollView>
      <View className='h-[12%]'>

      </View>
    </SafeAreaView>
  )
}

export default Home