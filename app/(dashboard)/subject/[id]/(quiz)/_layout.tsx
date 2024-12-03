import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const QuizRootLayout = () => {
  return (
    <Stack>
        <Stack.Screen name="SelectTopic" options={{ headerShown: false }} />
        <Stack.Screen name="Quiz" options={{ headerShown: false }} />
    </Stack>
  )
}

export default QuizRootLayout