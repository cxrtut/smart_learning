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
                // TODO: Only route to onboarding if its initial signup
                router.push('/(onboarding)/School' as Href)
            } else if (result.code === 'session_exists') {
                router.push('/(dashboard)/(home)/Home' as Href)
            }
        } catch (err) {
        console.error('OAuth error', err)
        }
    }, [])

    return (
        <View>
            <View className="flex flex-row justify-center items-center mt-4 gap-x-3">
                <View className="flex-1 h-[1px] bg-general-100"/>
                <Text className="text-lg text-white">Or</Text>
                <View className="flex-1 h-[1px] bg-general-100"/>
            </View>

            <CustomButton
                title="Log In with Google"
                className="mt-5 w-full shadow-none bg-white"
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