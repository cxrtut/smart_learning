import { View, Text, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from 'react-native'
import React, { Dispatch, SetStateAction, useState } from 'react'
import { ArrowRight, Camera as Cam, File, Plus } from "lucide-react-native";
import { useRouter } from 'expo-router'
import { Image } from 'react-native';
import { images } from '@/constants';
import colors from '@/constants/colors';

const ChatInputSection = ({
    isChatActive, 
    setIsChatActive,
    onOpenCamera,
    onOpenFilePicker,
    value,
    setInputText,
    ocrContents
} : {
    isChatActive: boolean,
    setIsChatActive: React.Dispatch<React.SetStateAction<boolean>>,
    onOpenCamera?: () => void,
    onOpenFilePicker?: () => void,
    value?: string,
    setInputText?: Dispatch<SetStateAction<string>>,
    ocrContents?: string
}) => {

    
    const [isKeyboardActive, setIsKeyboardActive] = useState(false)
    const [chatValue, setChatValue] = useState(ocrContents || "")
    const [height, setHeight] = useState(0);
    
    // if(ocrContents) {
    //     setChatValue(ocrContents)
    // }
    const displayChat = () => {
        console.log("Chat Displayed")
        setChatValue("")
    }

    const router = useRouter()


    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0} // Adjust based on header height
            className='flex'
        >
        <View className='flex w-full p-3 m-0 items-center justify-between min-h-[110px]'>
            <View className={`bg-[#afbcff] flex w-full flex-1 p-1 rounded-lg overflow-hidden`}>
                <View className='bg-[#afbcff] flex-[0.6]'>
                    <TextInput
                        multiline
                        value={chatValue}
                        className='w-full flex flex-1 p-2 bg-[#bbc6ff]'
                        onChangeText={setChatValue}
                        onContentSizeChange={(event) => 
                            setHeight(event.nativeEvent.contentSize.height)
                        }
                        style={{ height: Math.max(35, height) }}
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
                    <TouchableOpacity onPress={isChatActive ? displayChat : () => console.log("not chat active")} className='pr-1'>
                        <ArrowRight size={24} color={'gray'} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
        </KeyboardAvoidingView>
    )
}

export default ChatInputSection