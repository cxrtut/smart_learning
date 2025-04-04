import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { Href, router, useLocalSearchParams } from 'expo-router';
import CustomHeader from '@/components/CustomeHeader';
import CustomCard from '@/components/CustomCard';
import { useOnboarding } from '@/context/OnboardingProvider';

const Options = () => {
    const {activeSubject} = useOnboarding()
    const {id} = useLocalSearchParams<{id:string}>();

    return (
        <View className='flex h-full w-full bg-slate-300'>
            <CustomHeader  
                title={activeSubject?.subjectName as string}
                subtitle='Select A Option'
                showBackButton={true}
                headerStyles='pr-3'
            />
            <ScrollView className='h-full mt-2 p-3'>
                <View className='flex items-center justify-center'>
                    <CustomCard 
                        label='Course'
                        headingStyle='text-lg'
                        subTitle='Access all courses for this subject'
                        onPressAction={() => {router.push(`/(dashboard)/subject/${id}/VideoList` as Href)}}
                    />
                    <CustomCard 
                        label='Homework'
                        headingStyle='text-lg'
                        subTitle='Access all homework for this subject'
                        onPressAction={() => {router.push(`/(dashboard)/subject/${id}/Homework` as Href)}}
                    />
                    <CustomCard 
                        label='Quiz'
                        headingStyle='text-lg'
                        subTitle='Access all quizzes for this subject'
                        onPressAction={() => {router.push(`/(dashboard)/subject/${id}/SelectTopic` as Href)}} 
                    />
                    <CustomCard 
                        label='Past Question Papers'
                        headingStyle='text-lg'
                        subTitle='Access all past question papers for this subject'
                        onPressAction={() => {router.push(`/(dashboard)/subject/${id}/GradeCheck` as Href)}} 
                    />
                </View>
            </ScrollView>
        </View>
    )
}

export default Options