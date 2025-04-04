import { View, Text, TouchableOpacity, Alert } from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign'
import React from 'react'
import { useFileContext } from '@/context/FileProvider'
import * as ExpoMediaLibrary from 'expo-media-library'
import * as DocumentPicker from 'expo-document-picker';
import { analyzeImage } from '@/utils'
import { RelativePathString, router } from 'expo-router'
import { useOnboarding } from '@/context/OnboardingProvider'


const UploadFileBtn = () => {
    const {
        fileName,
        setocrFileContents,
        setFileUri, 
        setFileName
    } = useFileContext()
    const {activeSubject} = useOnboarding()

    const openFilePicker = async () => {
        try {
            const doc = await DocumentPicker.getDocumentAsync()

            if(doc.canceled) return;

            if(doc) {
                console.log(doc)
                setFileUri(doc.assets![0].uri)
                setFileName(doc.assets![0].name)

                const ocrContent = await analyzeImage(doc.assets![0].uri)

                if(ocrContent.error) {
                    Alert.alert("OCR Error", ocrContent.error)
                    return
                }

                setocrFileContents(ocrContent.responses[0].textAnnotations[0].description)
                router.push(`/(dashboard)/subject/${activeSubject?.subjectId}/OCRConfirm` as RelativePathString)
            } else {
                Alert.alert("Error", "An error occured while trying to open and analyze the file")
            }

        } catch (error: any) {
            console.error("OpenPDF Error: ", error)
            Alert.alert("Error", error.message)
        }
    }

    return (
        <TouchableOpacity
            onPressIn={openFilePicker}
            className='flex flex-row items-center pl-2'
        >
            <AntDesign name="addfile" size={20} color="gray" />
            <Text className='text-xs ml-1 text-gray-600'>Upload File</Text>
        </TouchableOpacity>
    )
}

export default UploadFileBtn