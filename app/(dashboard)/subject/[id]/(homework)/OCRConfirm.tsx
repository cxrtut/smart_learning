import { View, Text, Platform, TextInput } from 'react-native'
import React, { useState } from 'react'
import { Href, router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomHeader from '@/components/CustomHeader';
import colors from '@/constants/colors';
import { useOnboarding } from '@/context/onboardingContext';
import { Image } from 'react-native';
import CustomCard from '@/components/CustomCard';
import CustomButton from '@/components/CustomButton';
import { ScrollView } from 'react-native';
import { KeyboardAvoidingView } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { ArrowRight, CircleCheck, CirclePlus, CircleX } from 'lucide-react-native';

const OCRConfirm = () => {
    const { 
        ocrContents, 
        imageUri, 
        fileName 
    } = useLocalSearchParams<{
        ocrContents: string, 
        imageUri: string, 
        fileName: string
    }>();
     
    const [height, setHeight] = useState(0);
    const [inputText, setInputText] = useState<string>(ocrContents || "");

    const {activeSubject} = useOnboarding();

    console.log(`OCR Contents: ${ocrContents} | Image URI: ${imageUri}`)
    return (
        <SafeAreaView style={{backgroundColor: colors.PRIMARY}} className='flex h-full w-full'>
            <CustomHeader  
                title='Homework'
                subtitle={activeSubject?.subjectName}
                showBackButton={true}
                headerStyles='pr-3'
            />

            <View className='flex-1 w-full items-center justify-center m-0'>
                <View className='flex-[0.4] w-full px-5'>
                    <View className='flex-1 w-full'>
                        <Image 
                            source={{uri: imageUri}}
                            style={{width: '100%', height: '100%'}}                    
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
                                        onPress={() => {
                                                router.push(`/(dashboard)/subject/[id]/Homework` as Href)
                                            }} 
                                        className='flex flex-row items-center pl-2'
                                    >
                                        <CircleX size={24} color={'gray'} />
                                        <Text className='text-xs ml-1 text-gray-600'>Cancel</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity 
                                        onPress={() => {
                                                router.push({
                                                    pathname: `/(dashboard)/subject/[id]/Homework`,
                                                    params: {ocrContents: inputText, id: 1}
                                                })
                                            }
                                        } 
                                        className='flex flex-row items-center pr-3'
                                    >
                                        <CircleCheck size={24} color={'gray'} />
                                        <Text className='text-xs ml-1 text-gray-600'>Confirm</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </KeyboardAvoidingView>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default OCRConfirm