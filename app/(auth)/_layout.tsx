import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const AuthLayout = () => {
  return (
    <Stack initialRouteName="SignIn" screenOptions={{headerShown: false}}>
        <Stack.Screen name='SignIn'/>
        <Stack.Screen name='SignUp'/>
        <Stack.Screen name='ForgotPassword'/>
        <Stack.Screen name='ConfirmPassword'/>
    </Stack>
  )
}

export default AuthLayout