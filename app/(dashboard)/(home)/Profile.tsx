import { View, Text, TouchableOpacity, ActivityIndicator, ImageBackground } from 'react-native'
import React, { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuthContext } from '@/context/AuthProvider'
import CustomHeader from '@/components/CustomeHeader'
import CustomCard from '@/components/CustomCard'
import { useOnboarding } from '@/context/OnboardingProvider'

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { user, username } = useAuthContext()
  const { schoolLevel, gradeRange } = useOnboarding()

  const primaryGradeLevels = [
    { label: 'Grade 1 - 3', value: '1' },
    { label: 'Grade 4 - 6', value: '2' },
    { label: 'Grade 7', value: '3' },
  ];

  const secondaryGradeLevels = [
    { label: 'Grade 8 - 9', value: '4' },
    { label: 'Grade 10 - 12', value: '5' },
  ];

  const getSchoolLevelLabel = (level: string) => {
    switch (level) {
      case '1':
        return 'Primary';
      case '2':
        return 'Secondary';
      default:
        return 'Unknown';
    }
  };

  const getGradeLabel = (level: string) => {
    switch (schoolLevel) {
      case '1': // Primary school
        const primaryGrade = primaryGradeLevels.find((grade) => grade.value === level);
        return primaryGrade ? primaryGrade.label : 'Unknown'; // Return label
      case '2': // Secondary school
        const secondaryGrade = secondaryGradeLevels.find((grade) => grade.value === level);
        return secondaryGrade ? secondaryGrade.label : 'Unknown'; // Return label
      default:
        return 'Unknown'; // Default case for unknown levels
    }
  };

  const currentSchoolLevel = getSchoolLevelLabel(schoolLevel);
  const currentGradeLevel = getGradeLabel(gradeRange);

  return (
    <View className='bg-slate-300 p-0 h-full w-full'>
      <CustomHeader 
          title="Smart Learning"
          subtitle='Manage your account'
          showBackButton={false}
      />
      <View className="flex w-full items-center bg-white h-40">
        <ImageBackground
            source={require('@/assets/images/bg-3.jpg')}
            className='w-full h-full'
          />

          <View className='flex w-full h-[60%] absolute px-5 top-28'>
            <CustomCard
              label='Name'
              subTitle={username || 'No userName'}
            />
            <CustomCard
              label='Email'
              subTitle={user?.email || ''}
            />
            <CustomCard 
                label='School level'
                subTitle={currentSchoolLevel}
            />
            <CustomCard 
                label='Grade Level'
                subTitle={currentGradeLevel}
            />
          </View>

      </View>
      <View className='absolute bottom-28 w-full h-14 flex items-center justify-center px-10'>
        <TouchableOpacity
            onPress={async () => {
                try {
                  setIsLoading(false)
                  await supabase.auth.signOut()

                } catch (error) {
                    console.error(error)
                } finally {
                    setIsLoading(true)
                }
            }}
            className='bg-sky-500 p-2 rounded-full h-12 w-full items-center justify-center'
        >
          {isLoading ? (
            <ActivityIndicator size='small' color='white' />
          ) : (
            <Text className='text-white'>Sign Out</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Profile