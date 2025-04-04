import { View, Text, Alert, ActivityIndicator, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { RelativePathString, router, useLocalSearchParams } from 'expo-router';
import { useAuthContext } from '@/context/AuthProvider';
import { supabase } from '@/lib/supabase';
import { Picker } from '@react-native-picker/picker';
import { useOnboarding } from '@/context/OnboardingProvider';

const primaryGrades = [
    {label: 'Grade 1', value: '1'},
    {label: 'Grade 2', value: '2'},
    {label: 'Grade 3', value: '3'},
    {label: 'Grade 4', value: '4'},
    {label: 'Grade 5', value: '5'},
    {label: 'Grade 6', value: '6'},
    {label: 'Grade 7', value: '7'},
]

const secondaryGrades = [
    {label: 'Grade 8', value: '8'},
    {label: 'Grade 9', value: '9'},
    {label: 'Grade 10', value: '10'},
    {label: 'Grade 11', value: '11'},
    {label: 'Grade 12', value: '12'},
]

const GradeCheck = () => {
    const {schoolLevel, activeSubject} = useOnboarding()
    const {user} = useAuthContext()
    const {id} = useLocalSearchParams<{id:string}>();
    const [isLoading, setIsLoading] = useState(true)
    const [grade, setGrade] = useState('')
    const [grades, setGrades] = useState(schoolLevel === '1' ? primaryGrades : secondaryGrades)

    const userId = user?.id

    useEffect(() => {
        const checkGrade = async () => {
            try {
                setIsLoading(true)
                const {data, error} = await supabase.from('Onboarding').select('grade').eq('user_id', userId).single()
                if(data?.grade == null) {
                    setIsLoading(false)
                    return
                }

                if(data) {
                    setIsLoading(false)
                    router.replace({
                        
                        pathname: `/(dashboard)/subject/${id}/SelectYear` as RelativePathString,
                        params: {
                            grade: `Grade ${data.grade}`,
                            subject: activeSubject?.subjectName,
                        }
                    })
                }
            } catch (error) {
                Alert.alert('Error', 'Failed to check grade')
            }
        }
        checkGrade()
    }, [])

    const MoveToNextSection = async () => {
        if (!grade) {
            Alert.alert('Error', 'Please select a grade')
            return
        }

        const {data: existingData, error: existingError} = await supabase
        .from('Onboarding')
        .select('id, user_id, school_level, grade_range')
        .eq('user_id', userId)
        .single()

        if(existingError) {
            Alert.alert('Error', existingError.message)
            return
        }

        if(existingData) {

            const {data, error} = await supabase
            .from('Onboarding')
            .update({
                school_level: existingData.school_level,
                grade_range: existingData.grade_range,
                user_id: existingData.user_id, 
                grade: grade.toString()
            })
            .eq('id', existingData.id)
            .select('grade, id')

            if(error) {
                Alert.alert('Error', error.message)
                return
            }

            if(data) {
                router.replace({
                    pathname: `/(dashboard)/subject/${id}/SelectYear` as RelativePathString,
                    params: {
                        grade: `Grade ${grade}`,
                        subject: activeSubject?.subjectName,
                    }
                })
            }
        }
    }

    if(isLoading) {
        return (
            <View className='flex-1 items-center justify-center h-full'>
                <ActivityIndicator size='large' color='purple' />
            </View>
        )
    }

    return (
        <View className='flex h-full items-center justify-between py-3 pb-10 bg-slate-300'>
            <View className='flex pl-3 items-start gap-y-3 w-full'>
                <View className='w-full pl-3 flex gap-3'>
                    <Text className='pl-1 text-gray-700 font-semibold text-sm'>
                        Please select your actual grade?
                    </Text>
                    <Picker
                        selectedValue={grade}
                        onValueChange={(itemValue, itemIndex) =>
                        {
                            console.log({itemValue})
                            setGrade(itemValue)
                        }
                    }>
                        {grades.map((item, index) => (
                            <Picker.Item label={item.label} value={item.value} key={index} />
                        ))}
                    </Picker>
                </View>
            </View>

            <View className='w-full gap-y-5 flex flex-col items-center'>
                <TouchableOpacity
                    className='flex items-center justify-center bg-slate-500 px-4 p-4 rounded-full mt-[-25%] w-[70%]' 
                    onPress={() => MoveToNextSection()}
                    onPressIn={() => setGrade(grade)}
                >
                    <Text
                        className='font-bold text-lg text-white'
                    >
                        Next
                    </Text>
                    
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default GradeCheck