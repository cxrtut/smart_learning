import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const DashboardLayout = () => {
  return (
    <Stack>
        <Stack.Screen name="(home)" options={{ headerShown: false }} />
        <Stack.Screen name="subject/[id]/Options" options={{ headerShown: false }} />
        <Stack.Screen name="subject/[id]/(quiz)" options={{ headerShown: false }} />
        <Stack.Screen name="subject/[id]/(homework)" options={{ headerShown: false }} />
        <Stack.Screen name="subject/[id]/(course)" options={{ headerShown: false }} />
        <Stack.Screen name="subject/[id]/(pastpapers)" options={{ headerShown: false }} />
    </Stack>
  )
}

export default DashboardLayout