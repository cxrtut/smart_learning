import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const CourseRootLayout = () => {
  return (
    <Stack>
        <Stack.Screen name="Course" options={{ headerShown: false }} />
        <Stack.Screen name="Course_result" options={{ headerShown: false }} />
    </Stack>
  )
}

export default CourseRootLayout