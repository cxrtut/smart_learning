import { Stack } from "expo-router"




const Dashboard = () => {
  return (
    <Stack>
        <Stack.Screen name="(home)" options={{ headerShown: false }} />
        <Stack.Screen name="subject/[id]/Options" options={{ headerShown: false }} />
        <Stack.Screen name="subject/[id]/(quiz)" options={{ headerShown: false }} />
        {/* <Stack.Screen name="subject/[id]/(course)" options={{ headerShown: false }} /> */}
        <Stack.Screen name="subject/[id]/(homework)" options={{ headerShown: false }} />
    </Stack>
  )
}

export default Dashboard