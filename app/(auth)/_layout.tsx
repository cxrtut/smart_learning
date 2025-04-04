import React from 'react'
import { Stack } from 'expo-router'

const AuthLayout = () => {
  return (
    <Stack initialRouteName="SignIn" screenOptions={{headerShown: false}}>
        <Stack.Screen name='SignIn'/>
        <Stack.Screen name='SignUp'/>
    </Stack>
  )
}

export default AuthLayout