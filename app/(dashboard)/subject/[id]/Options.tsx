import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import colors from '@/constants/colors'
import CustomHeader from '@/components/CustomHeader'
import CustomCard from '@/components/CustomCard'
import { router, useLocalSearchParams } from 'expo-router'

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
                        label='COURSE'
                        onPressAction={() => {router.push(`/(dashboard)/subject/${id}/Course`)}} 
                    />
                     <CustomCard 
                        label='HOMEWORK'
                        onPressAction={() => {router.push(`/(dashboard)/subject/${id}/Homework`)}} 
                    />
                     <CustomCard 
                        label='QUIZ'
                        onPressAction={() => {router.push(`/(dashboard)/subject/${id}/Quiz`)}} 
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Options