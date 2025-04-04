import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import YouTubePlayer from 'react-native-youtube-iframe'
import CustomHeader from '@/components/CustomeHeader'
import { useOnboarding } from '@/context/OnboardingProvider'

const VideoPlayer = () => {
    const {activeSubject} = useOnboarding()
    const {videoId, videoTitle, videoDescription} = useLocalSearchParams<{videoId:string, videoTitle:string, videoDescription:string}>()
    console.log(videoId, videoTitle, videoDescription)
    return (
        <View style={{flex: 1, alignItems: 'center', backgroundColor: '#cbd5e1'}}>
            <CustomHeader  
                    title={activeSubject?.subjectName as string}
                    subtitle={videoTitle}
                    showBackButton={true}
                    headerStyles='pr-3'
            />
            <View className='flex items-center'>
                <View className='w-full'>
                    <YouTubePlayer
                        height={230}
                        width={400}
                        videoId={videoId}
                        play={false}
                    />
                </View>
                <View className='w-full flex'>
                    <View className='flex bg-white p-2 rounded-md'>
                        <Text className='font-bold text-lg text-gray-900 dark:text-white'>{videoTitle}</Text>
                        <Text className='text-gray-700 dark:text-gray-300 mt-2'>{videoDescription}</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default VideoPlayer

const styles = StyleSheet.create({
    shadowMd: {
      shadowColor: 'rgba(0, 0, 0, 0.1)', // Equivalent to rgb(0 0 0 / 0.1)
      shadowOffset: { width: 0, height: 4 }, // 0 4px
      shadowOpacity: 0.1, // Controls shadow transparency
      shadowRadius: 4.65, // Blurring effect
      elevation: 6, // Android equivalent
    },
  });