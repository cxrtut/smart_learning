import { View, Text, TouchableOpacity, Alert } from 'react-native'
import Feather from '@expo/vector-icons/Feather'
import { Camera, CameraPermissionStatus } from 'react-native-vision-camera'
import * as ExpoMediaLibrary from 'expo-media-library'
import React, { useCallback, useState } from 'react'
import { Href, router } from 'expo-router'
import { useOnboarding } from '@/context/OnboardingProvider'
import { usePermissionsContext } from '@/context/PermissionsProvider'


const OpenCameraBtn = () => {
    const {activeSubject} = useOnboarding();
    const {
        cameraPermissionStatus, 
        mediaLibraryPermission, 
        setCameraPermissionStatus, 
        requestMediaLibraryPermission
    } = usePermissionsContext()
    

    const handlePermissions = useCallback(async () => {
        console.log("Run handlePermissions")
        try {
            console.log("=========Start Permissions=========")
            console.log(cameraPermissionStatus)
            console.log("Media Library Permission: ", mediaLibraryPermission?.granted)
            if(cameraPermissionStatus === "not-determined" || !mediaLibraryPermission?.granted) {
                const permissions = await Camera.requestCameraPermission()
                console.log("Requesting camera permissions", permissions)
                setCameraPermissionStatus(permissions)

                const mediaLibraryPermission = await requestMediaLibraryPermission();
                console.log("mediaLibrary: ",mediaLibraryPermission.granted)

                if(permissions === "denied" || !mediaLibraryPermission?.granted) {
                    Alert.alert('Error', 'Camera permissions are required to use this feature')
                    return
                }

                if(mediaLibraryPermission?.granted && permissions === "granted") {
                    router.push(`/(dashboard)/subject/${activeSubject?.subjectId}/Camera` as Href)
                }

            }

            if(cameraPermissionStatus === "granted" && mediaLibraryPermission?.granted) {
                router.push(`/(dashboard)/subject/${activeSubject?.subjectId}/Camera` as Href)
            }
            
        } catch (error) {
            Alert.alert('Error', 'Failed to request camera permissions')
        }
    }, [])

    return (
        <TouchableOpacity
            onPress={handlePermissions} 
            className='flex flex-row items-center pl-2'
        >
            <Feather name="camera" size={20} color="gray" />
            <Text className='text-xs ml-1 text-gray-600'>Take Photo</Text>
        </TouchableOpacity>
    )
}

export default OpenCameraBtn