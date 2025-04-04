import { View, Text, FlatList, Alert, Image, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomHeader from '@/components/CustomeHeader'
import CustomCard from '@/components/CustomCard'
import { useAuthContext } from '@/context/AuthProvider'
import { ActiveSubject, useOnboarding } from '@/context/OnboardingProvider'
import { supabase } from '@/lib/supabase'
import { Href, router } from 'expo-router'
import { getSubjectsByGradeAndSchool } from '@/utils'

const Home = () => {
  const {user, username, isAuthenticated} = useAuthContext();
  const {
    gradeRange, 
    schoolLevel, 
    setActiveSubject, 
    setSchoolLevel, 
    setGradeRange
  } = useOnboarding();


  const [loading, setLoading] = useState(true)
  const [resultSubjects, setResultSubjects] = useState<{ subject_name: string; subject_id: string; }[]>([]);

  useEffect(() => {
    const fetchDataAndLoadSubjects = async () => {
      if (!user) {
        router.push('/(auth)/SignIn' as Href);
        return;
      }
  
      setLoading(true);
  
      try {
        // Fetch onboarding data
        const { data: onboardingData, error: onboardingError } = await supabase
          .from('Onboarding')
          .select('school_level, grade_range')
          .eq('user_id', user?.id)
          .single();
  
        if (onboardingError) {
          console.error(onboardingError);
          Alert.alert('Onboarding Error', onboardingError.message);
          return;
        }
  
        console.log(onboardingData);
  
        if (onboardingData) {
          setGradeRange(onboardingData.grade_range);
          setSchoolLevel(onboardingData.school_level);
  
          // Fetch subjects based on fetched onboarding data
          const subjectsData = await getSubjectsByGradeAndSchool(
            onboardingData.grade_range,
            onboardingData.school_level
          );

          if(subjectsData.length === 0) {

          } else {

            setResultSubjects(subjectsData);

          }
  
        }
      } catch (error: any) {
        console.error("Error:", error);
        Alert.alert('Error', error.message || String(error));
      } finally {
        setLoading(false);
      }
    };
  
    fetchDataAndLoadSubjects();
  }, [user, router, setGradeRange, setSchoolLevel, setResultSubjects]);

  const onRedirectHandler = ({subjectName, subjectId}: {subjectName: string, subjectId: string}) => {
    setActiveSubject!({subjectName, subjectId} as ActiveSubject)
    router.push(`/(dashboard)/subject/${subjectId}/Options` as Href)
  }

  if (loading) {
    return (
      <View className='flex-1 items-center justify-center '> 
        <ActivityIndicator size='large' color='blue' />
      </View>
    )
  }
  return (
    <View className='p-0 bg-slate-300 w-full h-full'>
      <CustomHeader 
        title='Dashboard' 
        subtitle={`Welcome back, ${username}`}
        showBackButton={false} 
      />
      <View className='flex flex-col p-4 mb-5 h-[90%]'>
        <FlatList
          data={resultSubjects}
          renderItem={({ item }) => (
            <CustomCard 
              label={item.subject_name} 
              subTitle={"Find more about services for your subject"} 
              headerImage={require('@/assets/images/bg-3.jpg')} 
              onPressAction={() => {
                const subject_name = item.subject_name
                const subject_id = item.subject_id
                // console.log({subject_id, subject_name})
                onRedirectHandler({subjectName: subject_name, subjectId: subject_id})
              }}
            />
          )}
        />
        <View className='h-[10%]'>

        </View>
      </View>

    </View>
  )
}

export default Home