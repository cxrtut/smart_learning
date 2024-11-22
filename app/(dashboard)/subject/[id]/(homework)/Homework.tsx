import { View, Text, TextInput, TouchableOpacity, Alert, Switch } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Href, router, useLocalSearchParams, useRouter } from 'expo-router';
import { useOnboarding } from '@/context/onboardingContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomHeader from '@/components/CustomHeader';
import colors from '@/constants/colors';
import { Image } from 'react-native';
import { images } from '@/constants';
import ChatInputSection from '@/components/ChatInputSection';
import ReactNativeModal from 'react-native-modal';
import { Camera, CameraPermissionStatus } from 'react-native-vision-camera';

const Homework = () => {
    const { media, type } = useLocalSearchParams();
    const {activeSubject} = useOnboarding();

    const [isChatActive, setIsChatActive] = useState(false)
    const [showRequestModal, setShowRequestModal] = useState(false)

    const [cameraPermissionStatus, setCameraPermissionStatus] = 
    React.useState<CameraPermissionStatus>("not-determined")

    const requestCameraPermission = async () => {
        const permissions = await Camera.requestCameraPermission()
        setCameraPermissionStatus(permissions)
    }
    
    //Camera Permissions
    const handleCameraPermission = async () => {
            setShowRequestModal(false)
            requestCameraPermission() 
    }

    const handleContinue = () => {
        if(cameraPermissionStatus === "granted") {
            router.push('/(dashboard)/subject/[id]/(homework)/Camera')
        } else {
            setShowRequestModal(true)
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

                {!isChatActive && <View className='flex items-center justify-center'>
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

            <ReactNativeModal isVisible={showRequestModal} onBackdropPress={() => setShowRequestModal(false)}>
                <View className='min-h-[200px] rounded-2xl p-5 bg-white flex'>
                    <Text className='text-md'>You must grant SmartLearning access to your camera in order to take a photo</Text>
                    <View className='flex flex-row justify-between mt-5'>
                        <TouchableOpacity
                            onPress={() => setShowRequestModal(false)}
                        >
                            <Text>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={handleCameraPermission}
                        >
                            <Text className='font-semibold'>Request Permission</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </ReactNativeModal>

        </SafeAreaView>
    )
}

export default Homework
