import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import React, { useCallback, useState } from 'react'
import { Href, router, useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import colors from '@/constants/colors'
import { useSignIn } from '@clerk/clerk-expo'
import Toast from 'react-native-toast-message'

const SignIn = () => {
    const { signIn, setActive, isLoaded } = useSignIn()
    const router = useRouter()
    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    const onSignInPress = useCallback(async () => {
        if (!isLoaded) return
    
        try {
          const signInAttempt = await signIn.create({
            identifier: form.email,
            password: form.password,
          })
    
          if (signInAttempt.status === 'complete') {
            await setActive({ session: signInAttempt.createdSessionId })
            router.replace('/(dashboard)/(home)/Home' as Href)
          } else {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Invalid email or password'
            })
          }
        } catch (err: any) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: err.errors[0].longMessage
            })
        }
      }, [isLoaded, form.email, form.password])

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
                    Log in to your account
                </Text>
                <TextInput
                    className='pl-5 text-white border-b-[1px] rounded-xl border-white p-5 w-[90%]'
                    value={form.email}
                    onChangeText={newEmail => setForm({...form, email: newEmail})}
                    placeholder='Email'
                    textContentType='emailAddress'
                    placeholderTextColor={'white'}
                />

                <TextInput
                    className='pl-5 text-white border-b-[1px] rounded-lg border-white p-5 w-[90%]'
                    onChangeText={newPassword => setForm({...form, password: newPassword})}
                    value={form.password}
                    placeholder='Password'
                    textContentType='password'
                    placeholderTextColor={'white'}
                />
                <View className='w-full flex items-end px-12 pt-3'>
                    <TouchableOpacity
                        onPress={() => {
                            router.push('/(auth)/ForgotPassword' as Href)
                        }}
                    >
                        <Text>Forgot Password?</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>

            <View className='w-full gap-y-5 flex flex-col items-center'>
                <TouchableOpacity
                    onPress={() => {
                    router.push('/(auth)/SignUp' as Href)
                    }}
                >
                    <Text className='text-white'>
                        Don't have an account? Create one 
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    className='flex items-center justify-center bg-white px-4 p-4 rounded-full mt-[-25%] w-[70%]' 
                    onPress={onSignInPress}
                >
                    <Text
                        style={{color: colors.PRIMARY}}
                        className='font-bold text-lg'
                    >
                        Sign In
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default SignIn