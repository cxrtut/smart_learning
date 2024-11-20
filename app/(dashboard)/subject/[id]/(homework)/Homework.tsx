import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Href, router, useLocalSearchParams, useRouter } from 'expo-router';
import { useOnboarding } from '@/context/onboardingContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomHeader from '@/components/CustomHeader';
import colors from '@/constants/colors';
import { Camera, CameraPermissionStatus } from 'react-native-vision-camera'
import * as ExpoMediaLibrary from 'expo-media-library'
import { Image } from 'react-native';
import { images } from '@/constants';
import ChatInputSection from '@/components/ChatInputSection';

const Homework = () => {
    const { media, type } = useLocalSearchParams();
    const {activeSubject} = useOnboarding();

    const [isChatActive, setIsChatActive] = useState(false)

    
    //Camera Permissions
    const [cameraPermissionStatus, setCameraPermissionStatus] = 
    React.useState<CameraPermissionStatus>("not-determined")
    const [microphonePermissionStatus, setMicrophonePermissionStatus] = 
    React.useState<CameraPermissionStatus>("not-determined")
    
    const [mediaLibraryPermission, requestMediaLibraryPermission] = 
    ExpoMediaLibrary.usePermissions()
    
    const requestMicrophonePermission = async () => {
        const permissions = await Camera.requestMicrophonePermission()
        setMicrophonePermissionStatus(permissions)
    }
    
    const requestCameraPermission = async () => {
        const permissions = await Camera.requestCameraPermission()
        setCameraPermissionStatus(permissions)
    }
    
    //get permissions in useEffect
    useEffect(() => {
        requestCameraPermission()
        requestMicrophonePermission()
        const getMediaLibraryPermission = async () => {
            await requestMediaLibraryPermission()
        }
        getMediaLibraryPermission()
    }, [cameraPermissionStatus, microphonePermissionStatus, mediaLibraryPermission])

    const handleContinue = () => {
        if(cameraPermissionStatus === "granted" && 
            microphonePermissionStatus === "granted" ||
            mediaLibraryPermission?.granted
        ) {
            router.push("/(dashboard)/subject/[id]/(homework)Camera" as Href)
        } else {
            Alert.alert("Permissions", "Please go to settings and enable permissions.")
        }
    }


    return (
        <SafeAreaView style={{backgroundColor: colors.PRIMARY}} className='flex h-full w-full justify-between'>
            <View className='flex h-[70%] w-full'>
                <CustomHeader  
                    title='Homework'
                    subtitle={activeSubject?.subjectName}
                    showBackButton={true}
                    headerStyles='pr-3'
                />

                {isChatActive === false && <View className='flex items-center justify-center'>
                    <Image
                    source={images.onboarding13}
                    style={{ width: 400, height: 650 }}
                    resizeMode='contain'
                    className='ml-[-30]'
                    />
                    {/* <Text className='flex items-center justify-center truncate mt-[-30%] text-white font-normal w-[50%] text-xs text-center p-3 border-[1.1px] rounded-full border-white'>
                        Start by uploading your homework or ask a question.
                    </Text> */}
                </View>}

                {isChatActive && <View className='flex-1 items-center justify-center'>
                    <Text className='text-white'>Chat Active</Text>
                    </View>
                }

            </View>

            <ChatInputSection
                isChatActive={isChatActive}
                setIsChatActive={setIsChatActive}
                onContinue={handleContinue}
            />


        </SafeAreaView>
    )
}

export default Homework
