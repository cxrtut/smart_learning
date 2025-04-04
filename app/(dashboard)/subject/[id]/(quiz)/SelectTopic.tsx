import { View, Text, ScrollView, Alert, ActivityIndicator, Image, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomHeader from '@/components/CustomeHeader'
import { useAuthContext } from '@/context/AuthProvider'
import { useOnboarding } from '@/context/OnboardingProvider'
import CustomCard from '@/components/CustomCard'
import { Href, RelativePathString, router, useLocalSearchParams } from 'expo-router'
import { supabase } from '@/lib/supabase'

const SelectTopic = () => {
    const {user} = useAuthContext()
    const {activeSubject} = useOnboarding()
    const {id, sujectName} = useLocalSearchParams();
    const [isLoading, setIsLoading] = useState(true)
    const [topics, setTopics] = useState<{subject_id: string, title: string}[]>([])
    const [error, setError] = useState(false)
    const [isEmpty, setIsEmpty] = useState(false)
    

    useEffect(() => {
        if (!user) {
            router.push('/(auth)/SignIn' as Href)
        }

        const fetchData = async () => {
            try {
                setIsLoading(true)
                const { data, error } = await supabase
                    .from('SubjectVideos')
                    .select('subject_id, title')
                    .eq('subject_id', id);

                if (error) {
                    setError(true)
                    Alert.alert('Error', error.message)
                    router.back();
                }

                if (data) {
                    if (data.length === 0) {
                        setIsEmpty(true)
                    }
                    setTopics(data)
                }
                
            } catch (error: any) {
                setError(true)
                console.error(error)
                Alert.alert('Error', error.message)
                
            } finally {
                setIsLoading(false)
            }
        }
        fetchData()

    }, [])

    if(isLoading) {
        return (
            <View className='flex items-center justify-center h-full w-full'>
                <ActivityIndicator size='large' color='#0000ff' />
            </View>
        )
    }

    if(error) {
        return (
            <View className='flex-1 justify-center items-center p-5 bg-slate-300'>
                <Image
                    source={require('@/assets/images/error_image.png')}
                    style={{aspectRatio: 1, height: '50%', resizeMode: 'contain'}}
                />
                <Text className='text-lg mt-2 text-gray-700'>
                    Failed to load subjects
                </Text>
                <Pressable 
                    style={{backgroundColor: '#5470FD'}}
                    className='p-4 mt-4 rounded-full w-full'
                    onPress={() => router.back()}
                >
                    <Text className='text-white text-center text-md font-bold'>
                        Try Again
                    </Text>
                </Pressable>
            </View>
        )
    }

    if(isEmpty) {
        return (
            <View className='flex-1 justify-center items-center p-5 bg-slate-300'>
                <Image
                    source={require('@/assets/images/fail_image.png')}
                    style={{height: "50%",aspectRatio: 1, resizeMode: "contain"}}
                />
                <Text className='text-lg mt-2 text-gray-700 text-center px-5 font-light mb-3'>
                    Ohh No!, There's no quiz topics available, Try again later.
                </Text>
                <Pressable 
                    style={{backgroundColor: '#5470FD'}}
                    className='p-4 mt-4 rounded-full w-full'
                    onPress={() => router.back()}
                >
                    <Text className='text-white text-center text-md font-medium'>
                        Try Again
                    </Text>
                </Pressable>
            </View>
        )
    }

    return (
        <View style={{flex: 1, height: '100%', width: '100%', backgroundColor: "#cbd5e1", padding: 0}}>
            <CustomHeader 
                title={activeSubject?.subjectName as string}
                subtitle='Please select a topic'
                showBackButton={true}
            />
            <ScrollView style={{height: '100%', padding: 15, paddingBottom: 5}}>
                {topics.map((topic, index) => (
                    <CustomCard
                        key={index}
                        label={topic.title}
                        subTitle='Read and understand instructions before starting'
                        onPressAction={() => {
                            router.push({
                                pathname: `/subject/${id}/StartQuiz` as RelativePathString,
                                params: {subjectName: activeSubject?.subjectName, topic: topic.title}
                            })
                        }}
                    />
                ))}
            </ScrollView>
        </View>
    )
}

export default SelectTopic