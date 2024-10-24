import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import colors from '@/constants/colors'
import { Href, router } from 'expo-router'

const ConfirmPassword = () => {

    const [password, setPassword] = React.useState('')
    const [confirmPassword, setConfirmPassword] = React.useState('')

    const ResetPassword = () => {
        console.log('Resetting password')

        // if (password === confirmPassword) {
        //     // TODO: Reset password
        // } else {
        //     alert('Passwords do not match')
        // }

        // Redirect to Sign In page
        
        router.replace('/(auth)/SignIn' as Href)
    }

    return (
        <SafeAreaView 
            style={{backgroundColor: colors.PRIMARY}}
            className='flex h-full items-center justify-between py-3 pb-10'
        >
        <View className='flex pl-3 items-start gap-y-14 w-full'>
            <Text 
            className='text-start p-3 pl-5 font-bold text-white text-3xl'
            >
            Smart Learning
            </Text>

            <View className='w-full pl-3 flex gap-2'>
                <Text className='pl-3 text-white font-semibold text-lg'>
                    Reset password
                </Text>
                <TextInput
                    className='pl-5 text-white border-b-[1px] rounded-xl border-white p-5 w-[90%]'
                    placeholder='New Password'
                    textContentType='password'
                    placeholderTextColor={'white'}
                />

                <TextInput
                    className='pl-5 text-white border-b-[1px] rounded-lg border-white p-5 w-[90%]'
                    placeholder='Confirm Password'
                    textContentType='password'
                    placeholderTextColor={'white'}
                />
            </View>
        </View>

            <View className='w-full gap-y-5 flex flex-col items-center'>
                <TouchableOpacity
                    className='flex items-center justify-center bg-white px-4 p-4 rounded-full mt-[-25%] w-[70%]' 
                    onPress={() => ResetPassword()}
                >
                    <Text
                        style={{color: colors.PRIMARY}}
                        className='font-bold text-lg'
                    >
                        Reset
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default ConfirmPassword