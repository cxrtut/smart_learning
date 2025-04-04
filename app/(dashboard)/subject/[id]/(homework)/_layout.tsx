import React from 'react'
import { Stack } from 'expo-router'
import { MessageProvider } from '@/context/MessageProvider'
import { FileProvider } from '@/context/FileProvider'
import { PermissionsProvider } from '@/context/PermissionsProvider'

const HomeworkRootLayout = () => {
  return (
    <FileProvider>
      <MessageProvider>
        <PermissionsProvider>
          <Stack>
              <Stack.Screen name="Homework" options={{ headerShown: false }} />
              <Stack.Screen name="OCRConfirm" options={{ headerShown: false }} />
              <Stack.Screen name="Camera" options={{ headerShown: false }} />
          </Stack>
        </PermissionsProvider>
      </MessageProvider>
    </FileProvider>
  )
}

export default HomeworkRootLayout