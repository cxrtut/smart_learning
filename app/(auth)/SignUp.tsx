import { View, Text, TouchableOpacity, TextInput, ScrollView, Image } from 'react-native'
import React, { useState } from 'react'
import { Href, router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import colors from '@/constants/colors'
import Toast from 'react-native-toast-message'
import OAuth from '@/components/OAuth'
import { useSignUp } from '@clerk/clerk-expo'
import ReactNativeModal from 'react-native-modal'
import { images } from '@/constants'
import CustomButton from '@/components/CustomButton'
import { fetchAPI } from '@/lib/fetch'
import CustomInput from '@/components/CustomInput'

const SignUp = () => {
    const { isLoaded, signUp, setActive } = useSignUp()
    const [showSuccessModal, setShowSuccessModal] = useState(false)
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const [verification, setVerification] = useState({
        state: 'default',
        error: '',
        code: ''
    })

    const onSignUpPress = async () => {
        if (!isLoaded) {
          return
        }

        if (form.password !== form.confirmPassword) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Passwords do not match'
            })
            return
        }
    
        try {
          await signUp.create({
            // firstName: form.name,
            emailAddress: form.email,
            password: form.password,
          })
    
          await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })
    
          setVerification({
            ...verification,
            state: 'pending',
          })
        } catch (err: any) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: err.errors[0].longMessage
            })
        }
      }
    
      const onPressVerify = async () => {
        if (!isLoaded) return
    
        try {
          const completeSignUp = await signUp.attemptEmailAddressVerification({
            code: verification.code,
          })
    
          if (completeSignUp.status === 'complete') {
            await fetchAPI('/(api)/user', {
                method: 'POST',
                body: JSON.stringify({
                  name: form.name,
                  email: form.email,
                  clerkId: completeSignUp.createdUserId,
                })
              });
            await setActive({ session: completeSignUp.createdSessionId })
            setVerification({
                ...verification, 
                state: 'success' 
            })
          } else {
            setVerification({
                ...verification, 
                state: 'failed', 
                error: 'Varification failed' 
            })
          }
        } catch (err: any) {
          setVerification({
            ...verification,
            state: 'failed',
            error: err.errors[0].longMessage,
          })
        }
      }

    return (
        <SafeAreaView 
            style={{backgroundColor: colors.PRIMARY}}
            className='flex h-full items-center justify-between py-3 pb-10'
        >
        <View className='flex pl-5 items-start gap-y-14 w-full'>
            <Text 
            className='text-start p-3 pl-5 font-bold text-white text-3xl'
            >
            Smart Learning
            </Text>

            <ScrollView className='w-full pl-3 flex gap-2'>
                <Text className='pl-3 text-white font-semibold text-lg'>
                    Register
                </Text>
                <CustomInput
                    placeholder='Name'
                    value={form.name}
                    onChangeText={newName => setForm({...form, name: newName})}
                    textContentType='name'
                    placeholderTextColor={'white'}
                />

                <CustomInput
                    placeholder='Email'
                    value={form.email}
                    onChangeText={newEmail => setForm({...form, email: newEmail})}
                    textContentType='emailAddress'
                    placeholderTextColor={'white'}
                />
                <CustomInput
                    placeholder='Password'
                    value={form.password}
                    onChangeText={newPassword => setForm({...form, password: newPassword})}
                    textContentType='password'
                    secureTextEntry={true}
                    placeholderTextColor={'white'}
                />
                <CustomInput
                    placeholder='Confirm Password'
                    value={form.confirmPassword}
                    onChangeText={newConfirmPassword => setForm({...form, confirmPassword : newConfirmPassword})}
                    textContentType='password'
                    secureTextEntry={true}
                    placeholderTextColor={'white'}
                />
                <OAuth/>
            </ScrollView>
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
                <CustomButton
                    title={"Sign In"}
                    className="w-[70%] mt-[25%] shadow-none bg-white"
                    bgVariant="outline"
                    textVariant="secondary"
                    onPress={onSignUpPress}
                />
            </View>

            <ReactNativeModal
                isVisible={verification.state === 'pending'}
                onModalHide={() => { 
                    if(verification.state === 'success')  setShowSuccessModal(true)
                }}
            >
                <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
                <Text className="text-2xl font-JakartaSemiBold mb-2 ">
                    Verfication
                </Text>
                <Text className="font-Jakarta mb-5">
                    We've sent a verification code to {form.email}. Please enter the code below.
                </Text>

                <TextInput
                    placeholder="12345"
                    value={verification.code}
                    keyboardType="numeric"
                    onChangeText={(code) => setVerification({ ...verification, code })}
                />

                {verification.error && (
                    <Text className="text-red-500 text-sm mt-1 font-Jakarta">
                    {verification.error}
                    </Text>
                )}

                <CustomButton
                    title="Verify Email"
                    onPress={onPressVerify}
                    className="mt-5 bg-success-500"
                />
                </View>
            </ReactNativeModal>

            {/* Modal for OTP verification */}
            <ReactNativeModal isVisible={verification.state === 'success'}>
                <View className='bg-white px-7 py-9 rounded-2xl min-h-[300px]'>
                    <Image
                        source={images.check}
                        className='w-[110px] h-[110px] mx-auto my-5'
                    />
                    <Text className="text-3xl text-black text-center">
                        Verified
                    </Text>
                    <Text className="text-base text-gray-400 text-center">
                        You have successfully verified account.
                    </Text>

                    <CustomButton
                        title="Browse Home"
                        onPress={() => {
                        setShowSuccessModal(false)
                        router.push('/(onboarding)/School')
                        }}
                        className="mt-5"
                    />
                </View>

            </ReactNativeModal>
        </SafeAreaView>
    )
}

export default SignUp