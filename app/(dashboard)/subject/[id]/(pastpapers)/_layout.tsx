import React from 'react'
import { Stack } from 'expo-router'

const PastPapersLayout = () => {
  return (
    <Stack>
        <Stack.Screen name='GradeCheck' options={{ headerShown: false }} />
        <Stack.Screen name='SelectYear' options={{ headerShown: false }} />
        <Stack.Screen name='ListPapers' options={{ headerShown: false }} />
        <Stack.Screen name='PdfViewer' options={{ headerShown: false }} />
    </Stack>
  )
}

export default PastPapersLayout