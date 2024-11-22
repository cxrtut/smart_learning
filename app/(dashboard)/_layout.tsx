import { Stack } from "expo-router"




const Dashboard = () => {
  return (
    <Stack>
        <Stack.Screen name="(home)" options={{ headerShown: false }} />
        <Stack.Screen name="subject/[id]/Options" options={{ headerShown: false }} />
        <Stack.Screen name="subject/[id]/Course" options={{ headerShown: false }} />
        <Stack.Screen name="subject/[id]/Homework" options={{ headerShown: false }} />
        <Stack.Screen name="subject/[id]/Quiz" options={{ headerShown: false }} />
        <Stack.Screen name="subject/[id]/Course_result" options={{ headerShown:false }}/>
    </Stack>
  )
}

export default Dashboard