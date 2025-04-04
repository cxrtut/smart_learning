import { View, Text, Image, KeyboardAvoidingView, Platform, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useOnboarding } from '@/context/OnboardingProvider';
import CustomHeader from '@/components/CustomeHeader';
import { useFileContext } from '@/context/FileProvider';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Href, router } from 'expo-router';

const OCRConfirm = () => {
    const {activeSubject} = useOnboarding();
    const {ocrFileContents, fileUri, setocrFileContents} = useFileContext();

    const [height, setHeight] = useState(0);
    const [inputText, setInputText] = useState<string>(ocrFileContents || "");

    const handleConfirm = () => {
        setocrFileContents(inputText)
        setInputText("")

        router.dismissAll()
        router.replace(`/(dashboard)/subject/${activeSubject?.subjectId}/Homework` as Href)
    }

    const handleCancel = () => {
        setocrFileContents('')
        setInputText("")

        router.dismissAll()
        router.replace(`/(dashboard)/subject/${activeSubject?.subjectId}/Homework` as Href)
    }

    return (
        <View className='flex h-full w-full bg-slate-300'>
            <CustomHeader  
                title='OCR Confirm'
                subtitle={activeSubject?.subjectName}
                showBackButton={true}
                headerStyles='pr-3'
            />
            <View className='flex-1 w-full items-center justify-center m-0'>
                <View className='flex-[0.4] w-full px-5'>
                    <View className='flex-1 w-full'>
                        <Image 
                            source={{uri: `${fileUri}`}}
                            style={{width: '100%', height: '100%'}}
                            className='rounded-lg'                    
                        />
                    </View>
                </View>

                <View className='flex-[0.6] w-full flex m-0 p-2 justify-between'>
                    <View>

                    </View>

                    <KeyboardAvoidingView
                            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                            keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0} // Adjust based on header height
                            className='flex'
                        >
                            <View className='flex w-full p-3 m-0 items-center min-h-[120px]'>
                                <View className={`bg-[#afbcff] flex w-full flex-1 p-1 rounded-lg overflow-hidden`}>
                                    <View className='bg-[#afbcff] flex-[0.6]'>
                                        <TextInput
                                            multiline
                                            value={inputText}
                                            className='w-full flex flex-1 p-2 bg-[#bbc6ff] h-20'
                                            onChangeText={(text) => setInputText!(text)}
                                            onContentSizeChange={(event) => 
                                                setHeight(event.nativeEvent.contentSize.height)
                                            }
                                            style={{ height: Math.max(35, height) }}
                                            placeholder='Type a message...'
                                        />
                                    </View>
                                    <View className='bg-[#afbcff] flex-[0.4] flex-row items-center justify-between'>
                                        <TouchableOpacity
                                            className='flex flex-row items-center pl-2'
                                            onPress={() => handleCancel()}
                                        >
                                            <AntDesign name="closecircleo" size={20} color="gray" />
                                            <Text className='text-xs ml-1 text-gray-600'>Cancel</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity
                                            className='flex flex-row items-center pr-3'
                                            onPress={() => handleConfirm()}
                                        >
                                            <AntDesign name="checkcircleo" size={20} color="gray" />
                                            <Text className='text-xs ml-1 text-gray-600'>Confirm</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                    </KeyboardAvoidingView>
                </View>
            </View>
        </View>
    )
}

export default OCRConfirm