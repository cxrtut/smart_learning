import { View, Text, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { Href, useLocalSearchParams, useRouter } from 'expo-router';
import { useOnboarding } from '@/context/onboardingContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomHeader from '@/components/CustomHeader';
import colors from '@/constants/colors';
import { Image } from 'react-native';
import { images } from '@/constants';
import ChatInputSection from '@/components/ChatInputSection';
import ReactNativeModal from 'react-native-modal';
import { Camera, CameraPermissionStatus } from 'react-native-vision-camera';
import * as ExpoMediaLibrary from 'expo-media-library'
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { analyzeImage } from '@/utils';

const Homework = () => {
    const { media, type, ocrContents } = useLocalSearchParams<{media: string, type: string, ocrContents: string}>();
    const {activeSubject} = useOnboarding();
    const [isChatActive, setIsChatActive] = useState(false)
    const [showRequestModal, setShowRequestModal] = useState(false)

    const [fileName, setFileName] = useState("")
    const [fileUri, setFileUri] = useState("")
    const [fileType, setFileType] = useState("")
    const [fileContents, setfileContents] = useState("")
    const router = useRouter()

    let pdfResource = {
        uri: '',
        cache: true
    }
    
    const [cameraPermissionStatus, setCameraPermissionStatus] = 
    React.useState<CameraPermissionStatus>("not-determined")
    
    const [mediaLibraryPermission, requestMediaLibraryPermission] = 
    ExpoMediaLibrary.usePermissions()
    
    if(media && type) {
        console.log(`Media: ${media} | Type: ${type}`)
    }
    const requestCameraPermission = async () => {
        const permissions = await Camera.requestCameraPermission()
        setCameraPermissionStatus(permissions)
    }

    const requestMediaPermission = async () => {
        const permissions = await requestMediaLibraryPermission();
        if (!permissions?.granted) {
            Alert.alert("Permission Denied", "Media library access is required to proceed.");
        }
    };

    //Open File Picker
    const openFilePicker = async () => {
        try {
            const doc = await DocumentPicker.getDocumentAsync();
            setFileName(doc.assets![0].name)
            setFileUri(doc.assets![0].uri)
            const file = doc.assets![0].uri
            pdfResource.uri = file
            console.log("From file picker: ",file)

            const fileContent = await FileSystem.readAsStringAsync(file, { 
                encoding: FileSystem.EncodingType.Base64 
            });
            
            const result = await analyzeImage(fileUri, fileContent)

            console.log(result.responses[0].textAnnotations[0].description)
            setfileContents(result.responses[0].textAnnotations[0].description)

            router.push({
                //@ts-ignore
                pathname: '/(dashboard)/subject/[id]/(homework)/OCRConfirm',
                params: {
                    ocrContents: result.responses[0].textAnnotations[0].description, 
                    imageUri: String(fileUri),
                    fileName: fileName,
                    id: 1
                }
            })


            // doc.canceled ? console.log("User cancelled") : console.log(doc)

        } catch (error) {
            console.log("OpenPDF Error: " ,error)
        }
    }
    
    //Camera Permissions
    const handlePermissionRequest = async () => {
        setShowRequestModal(false)
        requestCameraPermission();
        await requestMediaLibraryPermission();

        console.log(`Camera Permissions: ${cameraPermissionStatus}|`, `Media Permissions: ${mediaLibraryPermission?.status}`);

        
    };

    //Open Camera
    const handleOpenCamera = () => {
        if(cameraPermissionStatus === "granted" && mediaLibraryPermission?.granted) {
            console.log(mediaLibraryPermission.status)
            router.push('/(dashboard)/subject/[id]/(homework)/Camera')
        } else {
            setShowRequestModal(true)
        }
    }


    return (
        <SafeAreaView style={{backgroundColor: colors.PRIMARY}} className='flex h-full w-full justify-between'>
            <View className='flex w-full'>
                <CustomHeader  
                    title='Homework'
                    subtitle={activeSubject?.subjectName}
                    showBackButton={true}
                    headerStyles='pr-3'
                />

                {/* {fileName && (
                    <View className='flex w-full items-center justify-center p-2'>
                        <Text className='text-white'>
                            {fileName}
                        </Text>
                        
                    </View>
                )} */}

                {!isChatActive && <View className='flex items-center justify-center'>
                    <Image
                    source={images.onboarding13}
                    style={{ width: 400, height: 650 }}
                    resizeMode='contain'
                    className='ml-[-30]'
                    />
                </View>}

                {isChatActive && <View className='flex-1 items-center justify-center'>
                    <Text className='text-white'>Chat Active</Text>
                    </View>
                }

                <ChatInputSection
                    isChatActive={isChatActive}
                    setIsChatActive={setIsChatActive}
                    onOpenCamera={handleOpenCamera}
                    onOpenFilePicker={openFilePicker}
                    ocrContents={ocrContents}
                />
            </View>

            

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
                            onPress={handlePermissionRequest}
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
