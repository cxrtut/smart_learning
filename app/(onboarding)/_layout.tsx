import React from 'react'
import { Stack } from 'expo-router'

const OnboardingLayout = () => {
  return (
    <Stack initialRouteName="School" screenOptions={{headerShown: false}}>
        <Stack.Screen name='School'/>
        <Stack.Screen name='Grade'/>
    </Stack>
  )
}

export default OnboardingLayout