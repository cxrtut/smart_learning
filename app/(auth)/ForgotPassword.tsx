import { View, Text, TouchableOpacity, TextInput, } from 'react-native'
import React from 'react'
import colors from '@/constants/colors'
import { Href, router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'

const ForgotPassword = () => {

    const sendResetLink = () => {
        console.log('Sending reset link')
        // TODO: Implement sending reset link

        // Redirect to Reset Password page
        router.push('/(auth)/ConfirmPassword' as Href)
    }

    return (
        <SafeAreaView 
            style={{backgroundColor: colors.PRIMARY}}
            className='flex h-full items-center justify-between pt-4 py-3 pb-10'
        >
        <View className='flex pl-3 items-start gap-y-14 w-full'>
            <Text 
            className='text-start p-3 pl-5 font-bold text-white text-3xl'
            >
            Smart Learning
            </Text>

            <View className='w-full pl-3 flex gap-2'>
                <Text className='pl-3 text-white font-semibold text-lg'>
                    Enter your email to reset password
                </Text>
                <TextInput
                    className='pl-5 text-white border-b-[1px] rounded-xl border-white p-5 w-[90%]'
                    placeholder='Email'
                    textContentType='emailAddress'
                    placeholderTextColor={'white'}
                />
            </View>
        </View>

            <View className='w-full gap-y-5 flex flex-col items-center'>
                <TouchableOpacity
                    className='flex items-center justify-center bg-white px-4 p-4 rounded-full mt-[-25%] w-[70%]' 
                    onPress={() => sendResetLink()}
                >
                    <Text
                        style={{color: colors.PRIMARY}}
                        className='font-bold text-lg'
                    >
                        Send
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default ForgotPassword