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
                title='Your Options'
                showBackButton={true}
                headerStyles='pr-3'
            />
            <ScrollView className='h-full mt-5 p-3'>
                <View className='flex items-center justify-center'>
                    <CustomCard 
                        label='Quiz'
                        onPressAction={() => {router.push(`/(dashboard)/subject/${id}/Quiz`)}} 
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Options