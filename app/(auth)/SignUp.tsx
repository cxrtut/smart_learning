import { useSignUp } from "@clerk/clerk-expo";
import { Href, Link, router } from "expo-router";
import React, { useState } from "react";
import { Alert, Image, ScrollView, Text, View } from "react-native";
import { ReactNativeModal } from "react-native-modal";

import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import OAuth from "@/components/OAuth";
import { icons, images } from "@/constants";
import { fetchAPI } from "@/lib/fetch";

import colors from '@/constants/colors'
import Toast from 'react-native-toast-message'



const SignUp = () => {
    const { isLoaded, signUp, setActive } = useSignUp();
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [verification, setVerification] = useState({
        state: 'default',
        error: '',
        code: ''
    });

    const onSignUpPress = async () => {
        if (!isLoaded) {
          return
        }
        // // compare password
        // if (form.password !== form.confirmPassword) {
        //     Toast.show({
        //         type: 'error',
        //         text1: 'Error',
        //         text2: 'Passwords do not match'
        //     })
        //     return
        // }
    
        try {
          await signUp.create({
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
        <ScrollView style={{ backgroundColor: colors.PRIMARY }} className="flex-1">
        <View className="flex-1">
            {/* Header view */}
            <View className="relative w-full h-[250px]">
                <Image source={images.teach} className="z-0 w-full h-[250px]" />
                {/* <Text className="text-2xl text-white font-JakartaSemiBold absolute bottom-5 left-11 transform -translate-x-1/2">
                    Smart Learning
                </Text> */}
            </View>

            {/* Sign-up Form view */}
            <View className="p-5">
                <InputField
                    label="Name"
                    placeholder="Enter name"
                    icon={icons.person}
                    value={form.name}
                    onChangeText={(newName: string) => setForm({ ...form, name: newName })}
                />
                <InputField
                    label="Email"
                    placeholder="Enter email"
                    icon={icons.email}
                    textContentType="emailAddress"
                    value={form.email}
                    onChangeText={(newEmail: string) => setForm({ ...form, email: newEmail })}
                />
                <InputField
                    label="Password"
                    placeholder="Enter password"
                    icon={icons.lock}
                    secureTextEntry={true}
                    textContentType="password"
                    value={form.password}
                    onChangeText={(newPassword: string) => setForm({ ...form, password: newPassword })}
                />
                {/* <InputField
                label="Password"
                placeholder="Confirm Password"
                icon={icons.lock}
                secureTextEntry={true}
                textContentType="password"
                value={form.password}
                onChangeText={(newConfirmPassword: string) => setForm({ ...form, confirmPassword: newConfirmPassword })}
                /> */}

                <CustomButton
                    title="Sign Up"
                    onPress={onSignUpPress}
                    className="mt-6"
                />
                <OAuth />
                
                {/* Sign-in botton */}
                <Link 
                    href="/(auth)/SignIn" 
                    className="text-lg text-center text-general-200 mt-10"
                >
                        Already have an account?{" "}
                    <Text className="text-primary-500">Sign In</Text>
                </Link>    
            </View>
            {/* End of Create Account View */}

            <ReactNativeModal
          isVisible={verification.state === "pending"}
          // onBackdropPress={() =>
          //   setVerification({ ...verification, state: "default" })
          // }
          onModalHide={() => {
            if (verification.state === "success") {
              setShowSuccessModal(true);
            }
          }}
        >
          <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
            <Text className="font-JakartaExtraBold text-2xl mb-2">
              Verification
            </Text>
            <Text className="font-Jakarta mb-5">
              We've sent a verification code to {form.email}.
            </Text>
            <InputField
              label={"Code"}
              icon={icons.lock}
              placeholder={"12345"}
              value={verification.code}
              keyboardType="numeric"
              onChangeText={(code) =>
                setVerification({ ...verification, code })
              }
            />
            {verification.error && (
              <Text className="text-red-500 text-sm mt-1">
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
        <ReactNativeModal isVisible={showSuccessModal}>
          <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
            <Image
              source={images.check}
              className="w-[110px] h-[110px] mx-auto my-5"
            />
            <Text className="text-3xl font-JakartaBold text-center">
              Verified
            </Text>
            <Text className="text-base text-gray-400 font-Jakarta text-center mt-2">
              You have successfully verified your account.
            </Text>
            <CustomButton
              title="Browse Home"
              onPress={() => router.push(`/(onboarding)/School`)}
              className="mt-5"
            />
          </View>
        </ReactNativeModal>

        
        </View>
      </ScrollView>
    )
}

export default SignUp