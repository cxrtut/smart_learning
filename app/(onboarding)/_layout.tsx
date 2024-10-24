import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const OnboardingLayout = () => {
  return (
    <Stack initialRouteName="School" screenOptions={{headerShown: false}}>
        <Stack.Screen name='School'/>
        <Stack.Screen name='Grade'/>
        <Stack.Screen name='Subjects'/>
    </Stack>
  )
}

export default OnboardingLayout