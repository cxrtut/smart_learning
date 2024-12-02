import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const HomeworkRootLayout = () => {
  return (
    <Stack>
        <Stack.Screen name="Camera" options={{ headerShown: false }} />
        <Stack.Screen name="Homework" options={{ headerShown: false }} />
        <Stack.Screen name="OCRConfirm" options={{ headerShown: false }} />
    </Stack>
  )
}

export default HomeworkRootLayout