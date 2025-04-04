import React from 'react'
import { Stack } from 'expo-router'

const QuizRootLayout = () => {
  return (
    <Stack>
        <Stack.Screen name="SelectTopic" options={{ headerShown: false }} />
        <Stack.Screen name="StartQuiz" options={{ headerShown: false }} />
        <Stack.Screen name="Questions" options={{ headerShown: false }} />
        <Stack.Screen name="Score" options={{ headerShown: false }} />
    </Stack>
  )
}

export default QuizRootLayout