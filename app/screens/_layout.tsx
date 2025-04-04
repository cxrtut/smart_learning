import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const ScreensLayout = () => {
  return (
    <Stack>
        <Stack.Screen name="Questions" options={{ headerShown: false }} />
        <Stack.Screen name="Score" options={{ headerShown: false }} />
    </Stack>
  )
}

export default ScreensLayout