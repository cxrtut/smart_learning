import { useOnboarding } from '@/context/onboardingContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomHeader from '@/components/CustomHeader';
import colors from '@/constants/colors';
import { Image } from 'react-native';
import { images } from '@/constants';
import ChatInputSection from '@/components/ChatInputSection';
import ReactNativeModal from 'react-native-modal';
import * as ExpoMediaLibrary from 'expo-media-library'
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { analyzeImage } from '@/utils';
import { View, Text, TextInput, TouchableOpacity, Alert, Switch, ScrollView, FlatList, KeyboardAvoidingView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Href, router, useLocalSearchParams, useRouter } from 'expo-router';
import { Camera, CameraPermissionStatus } from 'react-native-vision-camera';
import OpenAI from 'openai';
import { DarkTheme } from '@react-navigation/native';
import { Platform } from 'react-native';
import { Menu, MenuItem } from 'react-native-material-menu';
import {WebView} from 'react-native-webview';
import { ChatCompletionMessageParam } from 'openai/resources';

interface Message{
    id: string;
    type: 'text';
    content: string;
    sender: 'user' | 'system';
}

const openai = new OpenAI({
    apiKey: process.env.EXPO_PUBLIC_OPENAI_API_KEY,
});

const Homework = () => {
    const { media, type, ocrContents } = useLocalSearchParams<{media: string, type: string, ocrContents: string}>();
    const {activeSubject} = useOnboarding();
    const [isChatActive, setIsChatActive] = useState(false)
    const [showRequestModal, setShowRequestModal] = useState(false)
    const {id} = useLocalSearchParams<{id:string}>();
    const [loading, setLoading] = useState(false); 

    // messages
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputText, setInputText] = useState(ocrContents || '');

    const [fileName, setFileName] = useState("")
    const [fileUri, setFileUri] = useState("")
    const [fileType, setFileType] = useState("")
    const [fileContents, setfileContents] = useState("")
    const router = useRouter()
    
    const [cameraPermissionStatus, setCameraPermissionStatus] = 
    React.useState<CameraPermissionStatus>("not-determined")

    const sendMessage = async() =>{
        console.log("Send Message is working: ", inputText)
        if(inputText.trim().length === 0) return;

        // when the user adds a message
        const userMessage: Message = { id: Date.now().toString(), type: 'text', content: inputText, sender: 'user'};
        setMessages((prev) => [...prev, userMessage]);
        setInputText('');

        // OpenAI response
        setLoading(true);
        try{
            //@ts-ignore
            const response = await openai.chat.completions.create({
                model: 'gpt-3.5-turbo',
                messages: [
                    { role: 'system', content: 'You are a helpful assistant.'},
                    ...messages.map((msg) => ({
                        role: msg.sender === 'user' ? 'user' : 'assistant',
                        content: msg.content,
                    })),
                    { role: 'user', content: inputText},
                ],
            });

            const aiMessage: Message = {
                id: Date.now().toString(),
                type: 'text',
                content: response.choices[0]?.message?.content || 'Sorry, I did not understand that...',
                sender: 'system',
            };
            setMessages((prev) => [...prev, aiMessage]);
        } catch (error){
            console.error('Error generating AI response:', error);
        }finally{
            setLoading(false);
        }
    };

    // rendering messages
    const renderMessage = ({ item }: { item: Message}) => {
        return (
        <View
            style={{
                alignSelf: item.sender === "user" ? "flex-end" : "flex-start",
                backgroundColor: item.sender === "user" ? colors.PRIMARY : "#636360",
                padding: 10,
                borderRadius: 10,
                marginVertical: 5,
                maxWidth: "75%",
            }}>
        <Text style={{ color: item.sender === "user" ? "white" : "white" }}>
            {item.content}
        </Text>
      </View>
    )};


    
    const [mediaLibraryPermission, requestMediaLibraryPermission] = 
    ExpoMediaLibrary.usePermissions()
    
    const requestCameraPermission = async () => {
        const permissions = await Camera.requestCameraPermission()
        setCameraPermissionStatus(permissions)
    }

    //Open File Picker
    const openFilePicker = async () => {
        try {
            const doc = await DocumentPicker.getDocumentAsync();
            setFileName(doc.assets![0].name)
            setFileUri(doc.assets![0].uri)
            const file = doc.assets![0].uri
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
            console.log("OpenPDF Error: " ,{error})
            Alert.alert("Error", "An error occured while trying to open the file") 
        }
    }
    
    //Camera Permissions
    const handlePermissionRequest = async () => {
        setShowRequestModal(false)
        if (cameraPermissionStatus === "not-determined" || !mediaLibraryPermission?.granted) {
            requestCameraPermission();
            await requestMediaLibraryPermission();
            
        } else {
            console.log(`Camera Permissions: ${cameraPermissionStatus}|`, `Media Permissions: ${mediaLibraryPermission?.status}`);
        }
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
                    subtitle="Start a covresation with your AI teacher"
                    showBackButton={true}
                    headerStyles='pr-3'
                />
            </View>


            <View className='flex-1 items-center justify-center'>
                {!isChatActive && (
                    <Image
                        source={images.onboarding13}
                        className='w-3/4 h-3/4'
                        resizeMode="contain"
                    />
                )}
                {isChatActive && (
                    <View style={{ backgroundColor: "#c9c8c5", padding: 10 }} className={'flex-1 w-full'}>
                        <FlatList
                            className = {'flex-1 p-8 mt-2 w-full'}
                            data = {messages}
                            renderItem={renderMessage}
                            keyExtractor={(item) => item.id}
                            contentContainerStyle={{ paddingBottom: 10 }}
                        />
                    </View>
                )}
            </View>
                


            <ChatInputSection
                isChatActive={isChatActive}
                setIsChatActive={setIsChatActive}
                onOpenCamera={handleOpenCamera}
                value={inputText}
                setInputText={setInputText}
                sendMessage={sendMessage}
                onOpenFilePicker={openFilePicker}
            />
            

            <ReactNativeModal 
                isVisible={showRequestModal} 
                onBackdropPress={() => setShowRequestModal(false)}
            >
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