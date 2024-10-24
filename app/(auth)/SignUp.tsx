import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'
import { Href, router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import colors from '@/constants/colors'
import Toast from 'react-native-toast-message'

const SignUp = () => {
    const [name, setName] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [phoneNumber, setPhoneNumber] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [confirmPassword, setConfirmPassword] = React.useState('')

    const SignUp = () => {
        console.log('Signing up')

        //TODO: Implement sign up
        if (password === confirmPassword) {
            return
        } else {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Passwords do not match'
            })
        }

        // Redirect to Sign In page
        // router.push('/(auth)/SignIn' as Href)
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
                    Register
                </Text>
                <TextInput
                    className='pl-5 text-white border-b-[1px] rounded-xl border-white p-5 w-[90%]'
                    placeholder='Name'
                    value={name}
                    onChangeText={newName => setName(newName)}
                    textContentType='name'
                    placeholderTextColor={'white'}
                />

                <TextInput
                    className='pl-5 text-white border-b-[1px] rounded-lg border-white p-5 w-[90%]'
                    placeholder='Email'
                    value={email}
                    onChangeText={newEmail => setEmail(newEmail)}
                    textContentType='emailAddress'
                    placeholderTextColor={'white'}
                />
                <TextInput
                    className='pl-5 text-white border-b-[1px] rounded-lg border-white p-5 w-[90%]'
                    placeholder='Phone number'
                    value={phoneNumber}
                    onChangeText={newPhoneNumber => setPhoneNumber(newPhoneNumber)}
                    textContentType='telephoneNumber'
                    placeholderTextColor={'white'}
                />
                <TextInput
                    className='pl-5 text-white border-b-[1px] rounded-lg border-white p-5 w-[90%]'
                    placeholder='Password'
                    value={password}
                    onChangeText={newPassword => setPassword(newPassword)}
                    textContentType='password'
                    placeholderTextColor={'white'}
                />
                <TextInput
                    className='pl-5 text-white border-b-[1px] rounded-lg border-white p-5 w-[90%]'
                    placeholder='Confirm Password'
                    value={confirmPassword}
                    onChangeText={newConfirmPassword => setConfirmPassword(newConfirmPassword)}
                    textContentType='password'
                    placeholderTextColor={'white'}
                />
            </View>
        </View>

            <View className='w-full gap-y-5 flex flex-col items-center'>
                <TouchableOpacity
                    onPress={() => {
                    router.push('/(auth)/SignIn' as Href)
                    }}
                >
                    <Text className='text-white'>
                        Already have an account? Sign in 
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    className='flex items-center justify-center bg-white px-4 p-4 rounded-full mt-[-25%] w-[70%]' 
                    onPress={() => SignUp()}
                >
                    <Text
                        style={{color: colors.PRIMARY}}
                        className='font-bold text-lg'
                    >
                        Sign Up
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default SignUp