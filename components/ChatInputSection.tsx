import { View, Text, KeyboardAvoidingView, Platform, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';

import UploadFileBtn from './UploadFileBtn';
import { useFileContext } from '@/context/FileProvider';
import OpenCameraBtn from './OpenCameraBtn';
import { Message, useMessageContext } from '@/context/MessageProvider';
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.EXPO_PUBLIC_OPENAI_API_KEY,
});

const ChatInputSection = ({
    setIsChatActive,
    isChatActive
} : {
    isChatActive: boolean;
    setIsChatActive: React.Dispatch<React.SetStateAction<boolean>>
}) => {
    const {ocrFileContents} = useFileContext()
    const {setMessages, messages} = useMessageContext()

    const [height, setHeight] = useState(35);
    const [margin, setMargin] = useState(0);
    const [isKeyboardActive, setIsKeyboardActive] = useState(false)
    const [inputTextValue, setInputTextValue] = useState(ocrFileContents || "")

    const sendMessage = async () => {
        const userMessage: Message = { id: Date.now().toString(), type: 'text', content: inputTextValue, sender: 'user'};
        setMessages((prev) => [...prev, userMessage]);

        setInputTextValue('')

        // OpenAI response
        try {
            //@ts-ignore
            const response = await openai.chat.completions.create({
                model: 'gpt-3.5-turbo',
                messages: [
                    { role: 'system', content: 'You are a helpful assistant.'},
                    ...messages.map((msg) => ({
                        role: msg.sender === 'user' ? 'user' : 'assistant',
                        content: msg.content,
                    })),
                    { role: 'user', content: inputTextValue},
                ],
            })

            const aiMessage: Message = {
                id: Date.now().toString(),
                type: 'text',
                content: response.choices[0]?.message?.content || 'Sorry, I did not understand that...',
                sender: 'system',
            };
            setMessages((prev) => [...prev, aiMessage])

        } catch (error: any) {
            console.error('Failed to send message to OpenAI', error);
            const aiMessage: Message = { 
                id: Date.now().toString(), 
                type: 'text', 
                content: "Sorry, I'm having trouble connecting to OpenAI. Please try again later.", 
                sender: 'system'
            }
            setMessages((prev) => [...prev, aiMessage])
            Alert.alert('Failed to send message to OpenAI', error.message);

        }
    }

    const displayChat = () => {
        if(inputTextValue.trim().length === 0) return;
        inputTextValue && sendMessage() 
        setIsChatActive(true)
    }

    return (
        <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0} // Adjust based on header height
                className='flex'
            >
                <View className='flex w-full p-3 m-0 items-center justify-between min-h-[120px]'>
                    <View className={`bg-[#afbcff] flex w-full flex-1 p-1 rounded-lg overflow-hidden`}>
                        <View className='bg-[#afbcff] flex-[0.6]'>
                            <TextInput
                                value={inputTextValue!}
                                onChangeText={(text) => setInputTextValue(text)}
                                multiline
                                className='w-full flex-1 p-2 bg-[#bbc6ff]'
                                onContentSizeChange={(event) => {
                                    const newHeight = Math.max(35, event.nativeEvent.contentSize.height);
                                    setHeight(newHeight);
                                    setMargin(Math.max(0, 120 - margin));
                                
                                }}
                                style={{ height: height, backgroundColor: '#bbc6ff' }}
                                placeholder='Type a message...'
                            />
                        </View>
                        <View className='bg-[#afbcff] flex-[0.4] flex-row items-center justify-between'>
                            {isKeyboardActive ? (
                                <TouchableOpacity 
                                    onPress={() => setIsKeyboardActive(false)} 
                                    className='pl-2'
                                >
                                    <AntDesign name="plus" size={20} color="grey" />
                                </TouchableOpacity>
                            ) : (
                                <View className='flex flex-row items-center'>
                                    <UploadFileBtn />

                                    <OpenCameraBtn />
                                </View>
                            )}

                        <TouchableOpacity
                            className='pr-1'
                            onPress={() => displayChat()}
                        >
                            <AntDesign name="arrowright" size={20} color="gray" />
                        </TouchableOpacity>
                        </View>
                    </View>
                </View>

        </KeyboardAvoidingView>
    )
}

export default ChatInputSection