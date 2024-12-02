import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import colors from '@/constants/colors'
import CustomHeader from '@/components/CustomHeader'
import CustomCard from '@/components/CustomCard'
import { Href, router, useLocalSearchParams } from 'expo-router'

const Options = () => {
    const {id} = useLocalSearchParams<{id:string}>();
    return (
        <SafeAreaView style={{backgroundColor: colors.PRIMARY}} className='flex h-full w-full'>
            <CustomHeader  
                title='Select A Option'
                showBackButton={true}
                headerStyles='pr-3'
            />
            <ScrollView className='h-full mt-10 p-3'>
                <View className='flex items-center justify-center'>
                    <CustomCard 
                        label='Course'
                        headingStyle='text-lg'
                        subTitle='Access all courses for this subject'
                        onPressAction={() => {router.push(`/(dashboard)/subject/${id}/(course)/Course` as Href)}}
                    />
                     <CustomCard 
                        label='Homework'
                        headingStyle='text-lg'
                        subTitle='Access all homework for this subject'
                        onPressAction={() => {router.push(`/(dashboard)/subject/${id}/(homework)/Homework` as Href)}}
                    />
                     <CustomCard 
                        label='Quiz'
                        headingStyle='text-lg'
                        subTitle='Access all quizzes for this subject'
                        onPressAction={() => {router.push(`/(dashboard)/subject/${id}/(quiz)/SelectTopic` as Href)}} 
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Options