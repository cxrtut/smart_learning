import { useSignIn } from '@clerk/clerk-expo'
import { Href, Link, router, useRouter } from 'expo-router'
import React, { useCallback, useState } from 'react'
import { View, Image, Text, ScrollView} from 'react-native'

import colors from '@/constants/colors'

import Toast from 'react-native-toast-message'

import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import OAuth from "@/components/OAuth";
import { icons, images } from "@/constants";

const SignIn = () => {
    const { signIn, setActive, isLoaded } = useSignIn()
    const router = useRouter()

    const [form, setForm] = useState({
        email: "",
        password: "",
    })

    // login fuctionality
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
      }, [isLoaded, form])

    return (
        <ScrollView style={{ backgroundColor: colors.PRIMARY }} className="flex-1">
            <View className="flex-1">
                {/* Header view */}
                <View className="relative w-full h-[250px]">
                    <Image source={images.teach} className="z-0 w-full h-[250px]" />
                    {/* <Text className="text-2xl text-white font-JakartaSemiBold absolute bottom-5 left-11 transform -translate-x-1/2">
                        Smart Learning
                    </Text> */}
                </View>
                
                
                <View className="p-5">
                    {/* Email */}
                    <InputField
                        label="Email"
                        placeholder="Enter email"
                        icon={icons.email}
                        textContentType="emailAddress"
                        value={form.email}
                        onChangeText={(value) => setForm({ ...form, email: value })}
                    />

                    {/* Password */}
                    <InputField
                        label="Password"
                        placeholder="Enter password"
                        icon={icons.lock}
                        secureTextEntry={true}
                        textContentType="password"
                        value={form.password}
                        onChangeText={(value) => setForm({ ...form, password: value })}
                    />

                    {/*  */}
                    <CustomButton
                        title="Sign In"
                        onPress={onSignInPress}
                        className="mt-6"
                    />
                    
                    {/* Google Auth */}
                    <OAuth />

                    {/* >Sign Up button */}
                    <Link 
                        href="/(auth)/SignUp" 
                        className="text-lg text-center text-general-200 mt-10"
                    >
                        Don't have an account?{" "}
                        <Text className="text-primary-500">Sign Up</Text>
                    </Link>      
                </View>  
            </View>
        </ScrollView>
    )
}

export default SignIn