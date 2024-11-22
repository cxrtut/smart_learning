import { View, Text, TextInput, TouchableOpacity, Alert, Switch, ScrollView, FlatList, KeyboardAvoidingView } from 'react-native'
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
    const { media, type } = useLocalSearchParams();
    const {activeSubject} = useOnboarding();
    const {id} = useLocalSearchParams<{id:string}>();


    // messages
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputText, setInputText] = useState('');
    
    const [loading, setLoading] = useState(false); 
    const [isChatActive, setIsChatActive] = useState(false)
    const [showRequestModal, setShowRequestModal] = useState(false)

    const [cameraPermissionStatus, setCameraPermissionStatus] = 
    React.useState<CameraPermissionStatus>("not-determined")

    const sendMessage = async() =>{
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
            <View className='flex-1 h-[70%] w-full'>
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

                {isChatActive && (
                    <View style={{ backgroundColor: "#c9c8c5", padding: 10 }} className={'flex-1'}>
                        <FlatList
                            className = {'flex-1 p-8 mt-2'}
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
                onContinue={handleContinue}
                value={inputText}
                setInputText={setInputText}
                sendMessage={sendMessage}
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