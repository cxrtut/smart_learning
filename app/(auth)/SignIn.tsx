import { View, Text, TouchableOpacity, TextInput, Image } from 'react-native'
import React, { useCallback, useState } from 'react'
import { Href, router, useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import colors from '@/constants/colors'
import { useOAuth, useSignIn } from '@clerk/clerk-expo'
import Toast from 'react-native-toast-message'
import CustomButton from '@/components/CustomButton'
import { icons } from '@/constants'
import * as Linking from 'expo-linking'
import CustomInput from '@/components/CustomInput'

const SignIn = () => {
    const { signIn, setActive, isLoaded } = useSignIn()
    const router = useRouter()
    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' })

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

    const onOAuthSignInPress = useCallback(async () => {
        try {
            const { createdSessionId, signIn, signUp, setActive } = await startOAuthFlow({
                redirectUrl: Linking.createURL('/(dashboard)/(home)/Home', { scheme: 'myapp' }),
            })

            if (createdSessionId) {
                await setActive!({ session: createdSessionId })
            } else {
                //Proceed for now
            }

        } catch (err) {
            console.error('OAuth error', err)
        }
    }, [])

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

                <View className='w-full pl-5 flex gap-2'>
                    <Text className='pl-3 text-white font-semibold text-lg'>
                        Log in to your account
                    </Text>
                    <CustomInput
                        value={form.email}
                        onChangeText={newEmail => setForm({...form, email: newEmail})}
                        placeholder='Email'
                        textContentType='emailAddress'
                        placeholderTextColor={'white'}
                    />

                    <CustomInput
                        onChangeText={newPassword => setForm({...form, password: newPassword})}
                        value={form.password}
                        placeholder='Password'
                        textContentType='password'
                        placeholderTextColor={'white'}
                        secureTextEntry={true}
                    />

                    <View className='w-full flex items-end px-12 pt-3 mb-4'>
                        <TouchableOpacity
                            onPress={() => {
                                router.push('/(auth)/ForgotPassword' as Href)
                            }}
                        >
                            <Text>Forgot Password?</Text>
                        </TouchableOpacity>
                    </View>
                    <CustomButton
                        title={"Log In with Google"}
                        className="mt-5 w-[90%] shadow-none bg-white"
                        IconLeft={() => (
                            <Image
                                source={icons.google}
                                resizeMode="contain"
                                className="w-5 h-5 mx-2"  
                            />
                        )}
                        bgVariant="outline"
                        textVariant="primary"
                        onPress={onOAuthSignInPress}
                    />
                    
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
                <CustomButton
                    title={"Sign In"}
                    className="w-[70%] mt-[25%] shadow-none bg-white"
                    bgVariant="outline"
                    textVariant="secondary"
                    onPress={onSignInPress}
                />

            </View>
        </SafeAreaView>
    )
}

export default SignIn