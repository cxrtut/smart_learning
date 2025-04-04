import { View, Text, Image, Pressable } from 'react-native'
import React from 'react'
import { RelativePathString, router, useLocalSearchParams, useRouter } from 'expo-router'
import { useAuthContext } from '@/context/AuthProvider'

const Score = () => {
    const {user} = useAuthContext()
    const { score, id, subjectName, topic } = useLocalSearchParams()
    const router = useRouter()
    return (
        <View className='flex-1 items-center p-6 bg-slate-300'>
            <Image
                source={require('@/assets/images/score_image.png')}
                style={{height: '50%', aspectRatio: 1, resizeMode: 'contain'}}
            />
            <View className='w-full flex items-center justify-center p-5'>
                {score === "0" || score === "10" || score === "20" ? (
                    <Text className='text-lg mt-2 text-[#5470FD] text-center font-light'>
                        Better luck next time! You scored {score} points.
                    </Text>
                ) : score === "30" || score === "40" ? (
                    <Text className='text-lg mt-2 text-[#5470FD] text-center font-light'>
                        Congratulations!! {user?.email?.split('@')[0]} You Scored {score} Points.
                    </Text>
                ) : (
                    <Text className='text-lg mt-2 text-[#5470FD] text-center font-light'>
                        Your score is {score} points.
                    </Text>
                )}
            </View>

            <View className='w-full flex items-center justify-center px-6'>
                <Pressable 
                    className='bg-[#5470FD] p-4 mt-4 rounded-full w-full'
                    onPress={() => {
                        router.dismissAll()
                        router.replace({
                            pathname: `/subject/${id}/SelectTopic` as RelativePathString,
                            params: {subjectName: subjectName, topic: topic}
                    })
                }}
                >
                    <Text className='text-white text-md text-center font-light'>
                        Play Again
                    </Text>
                </Pressable>
            </View>
        </View>
    )
}

export default Score