import { View, Text, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from 'react-native'
import React, { Dispatch, SetStateAction, useState } from 'react'
import { ArrowRight, Camera as Cam, File, Plus } from "lucide-react-native";
import { useRouter } from 'expo-router'
import { Image } from 'react-native';
import { images } from '@/constants';
import colors from '@/constants/colors';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';

const ChatInputSection = ({
    isChatActive, 
    setIsChatActive,
    onOpenCamera,
    onOpenFilePicker,
    value,
    setInputText,
    ocrContents,
    onContinue,
    sendMessage
} : {
    isChatActive: boolean,
    setIsChatActive: React.Dispatch<React.SetStateAction<boolean>>,
    onOpenCamera?: () => void,
    onOpenFilePicker?: () => void,
    value?: string,
    setInputText?: Dispatch<SetStateAction<string>>,
    ocrContents?: string,
    onContinue?: () => void,
    sendMessage?: () => Promise<void>
}) => {

    const [isKeyboardActive, setIsKeyboardActive] = useState(false)
    const [fileName, setFileName] = useState("")
    const [fileContents, setfileContents] = useState("")
    // const [chatValue, setChatValue] = useState(ocrContents || "" || value)
    const [height, setHeight] = useState(35);
    const [margin, setMargin] = useState(0);

    const displayChat = () => {
        console.log("Chat Displayed")
        // setInputText!('')
        sendMessage!()
        // setChatValue("")
    }

    const router = useRouter()

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
                        multiline
                        value={value}
                        className='w-full flex-1 p-2 bg-[#bbc6ff]'
                        onChangeText={(text) => {
                            setInputText!(text)
                        }}
                        onContentSizeChange={(event) => {
                            const newHeight = Math.max(35, event.nativeEvent.contentSize.height);
                            setHeight(newHeight);
                            setMargin(Math.max(0, 120 - newHeight));
                        
                        }}
                        style={{ height: height, backgroundColor: '#bbc6ff' }}
                        placeholder='Type a message...'
                        onChange={() => {
                            setIsKeyboardActive(true);
                        }}
                    />
                </View>
                <View className='bg-[#afbcff] flex-[0.4] flex-row items-center justify-between'>
                    {isKeyboardActive ? (
                        <TouchableOpacity 
                            onPress={() => setIsKeyboardActive(false)} 
                            className='pl-2'
                        >
                            <Plus size={24} color={'gray'}  />
                        </TouchableOpacity>
                    ) : (
                        <View className='flex flex-row items-center'>
                            <TouchableOpacity onPress={onOpenFilePicker} className='flex flex-row items-center pl-2'>
                                <File size={24} color={'gray'} />
                                <Text className='text-xs ml-1 text-gray-600'>Upload File</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={onOpenCamera} className='flex flex-row items-center pl-2'>
                                <Cam size={24} color={'gray'} />
                                <Text className='text-xs ml-1 text-gray-600'>Take Photo</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    <TouchableOpacity
                        onPressIn={() => {
                            setIsChatActive(true)}
                        } 
                        onPress={
                            isChatActive ?
                            displayChat : 
                            () => console.log("not chat active")
                        } 
                        className='pr-1'
                    >
                        <ArrowRight size={24} color={'gray'} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
        </KeyboardAvoidingView>
    )
}

export default ChatInputSection