import { Alert, Image, Text, View } from "react-native"
import CustomButton from "./CustomButton"
import { icons } from "@/constants"
import { useCallback } from "react"
import { useOAuth } from "@clerk/clerk-expo"
import { googleOAuth } from "@/lib/auth"
import { Href, router } from "expo-router"

const OAuth = () => {
    const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' })

    const handleGoogleSignIn = useCallback(async () => {
        try {
            const result = await googleOAuth(startOAuthFlow)

            if(result.code === 'success') {
                router.push('/(onboarding)/School' as Href)
            } else if (result.code === 'session_exists') {
                router.push('/(dashboard)/(home)/Home' as Href)
            } else if (result.code === 'cancelled') {
                router.push('/(auth)/SignIn' as Href)
            }
        } catch (err) {
        console.error('OAuth error', err)
        }
    }, [])

    return (
        <View>
            <View className="flex flex-row justify-center items-center mr-5 mt-4 gap-x-3">
                <View className="flex-1 items-center justify-center h-[1px] bg-general-100"/>
                    <Text className="text-lg text-white">Or</Text>
                <View className="flex-1 h-[1px] bg-general-100"/>
            </View>

            <CustomButton
                title={"Sign Up with Google"}
                className="mt-5 w-[90%] shadow-none bg-white"
                IconLeft={() => (
                    <Image
                        source={icons.google}
                        resizeMode="contain"
                        className="w-5 h-5 mx-2"  
                    />
                )}
                bgVariant="outline"
                textVariant="primary"
                onPress={handleGoogleSignIn}
            />
        </View>
    )
}

export default OAuth