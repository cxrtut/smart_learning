import { View, Text, Pressable, Image } from 'react-native'
import React from 'react'
import { RelativePathString, router, useLocalSearchParams } from 'expo-router'
import CustomHeader from '@/components/CustomeHeader'
import { useOnboarding } from '@/context/OnboardingProvider'

const StartQuiz = () => {
    const {activeSubject} = useOnboarding()
    const {subjectName, topic, id} = useLocalSearchParams()

    return (
        <View style={{flex: 1, height: '100%', width: '100%', backgroundColor: '#cbd5e1'}}>
            <CustomHeader
                title='Start Quiz'
                subtitle={subjectName as string}
                showBackButton={true}
                headerStyles='pr-3'
            />
                <Image
                    source={require('@/assets/images/splash.png')}
                    style={{ // Set height relative to the screen
                        height: '50%',
                        aspectRatio: 1, // Maintain aspect ratio
                        resizeMode: 'contain',
                    }}
                />

            <View style={{width: '100%', display: 'flex', padding: 20}}>
                <Text className='text-2xl text-center text-[#5470FD] mb-3'>Instructions</Text>
                <Text className='text-center mb-2 font-light text-md'>
                    {topic}
                </Text>
                <View style={{ backgroundColor: '#5470FD', borderRadius: 5, justifyContent:'center', alignItems:'center', padding: 10 }}>
                    <Text className='text-white text-lg'>
                        Each Quiz Has Four Options Quiz
                    </Text>
                    <Text className='text-white text-lg'>
                        Progress will be shown at the top
                    </Text>
                    <Text className='text-white text-lg'>
                        Score will be shown at the end.
                    </Text>
                </View>
            </View>

            <View style={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <Pressable
                    style={{ backgroundColor: '#5470FD', paddingHorizontal: 10, paddingVertical: 15, borderRadius: 999, width: '50%' }}
                    onPress={() => router.push({
                        pathname: `/subject/${id}/Questions` as RelativePathString,
                        params: { topic: topic }
                    })}
                >
                    <Text className='text-white text-center text-lg'>Start Quiz</Text>
                </Pressable>
            </View>
        </View>
    )
}

export default StartQuiz