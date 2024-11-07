import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useOnboarding } from '@/context/onboardingContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomHeader from '@/components/CustomHeader';
import colors from '@/constants/colors';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { ArrowRight, Camera as Cam, File, Plus } from "lucide-react-native";
import { Image } from 'react-native';
import { images } from '@/constants';

const Homework = () => {
    const {id} = useLocalSearchParams<{id:string}>();
    const {activeSubject} = useOnboarding();

    const [isKeyboardActive, setIsKeyboardActive] = useState(false)
    const [fileName, setFileName] = useState("")
    const [fileContents, setfileContents] = useState("")
    const [chatValue, setChatValue] = useState("")
    const [isChatActive, setIsChatActive] = useState(false)

    const displayChat = () => {
        console.log("Chat Displayed")
        setChatValue("")
    }

    let pdfResource = {
        uri: '',
        cache: true
    }
    const router = useRouter()

    const openFilePicker = async () => {
        try {
            const doc = await DocumentPicker.getDocumentAsync();
            setFileName(doc.assets![0].name)
            const file = doc.assets![0].uri
            pdfResource.uri = file
            console.log(file)

            const fileContent = await FileSystem.readAsStringAsync(file, { encoding: FileSystem.EncodingType.UTF8 });
            //console.log(fileContents)
            setfileContents(fileContent)

            // doc.canceled ? console.log("User cancelled") : console.log(doc)

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <SafeAreaView style={{backgroundColor: colors.PRIMARY}} className='flex h-full w-full justify-between'>
        <View className='flex h-[70%]'>
            <CustomHeader  
                title='Homework'
                subtitle={activeSubject?.subjectName}
                showBackButton={true}
                headerStyles='pr-3'
            />

            {isChatActive === false && <View className='flex-1 items-center justify-center'>
                <Image
                source={images.onboarding13}
                style={{ width: 400, height: 650 }}
                resizeMode='contain'
                className='ml-[-30]'
                />
                <Text className='flex items-center justify-center text-gray font-semibold w-[50%] text-xs text-center bg-white p-3 border-[1px] rounded-full border-white'>
                    Start by uploading your homework or ask a question.
                </Text>
            </View>}

            {isChatActive && <View className='flex-1 items-center justify-center'>
                <Text className='text-white'>Chat Active</Text>
                </View>
            }

        </View>

        <View className="flex items-center flex-row justify-between gap-2 p-3 pr-9">
            <View>
                {isKeyboardActive ? (
                    <TouchableOpacity
                        onPress={() => setIsKeyboardActive(false)}
                        className="border-white border p-3 rounded-full flex items-center justify-center"
                    >
                        <Plus color={'white'} size={25} />
                    </TouchableOpacity>
                ): (
                        <View className="flex flex-row gap-1">
                            <TouchableOpacity 
                                className="border-white border p-3 rounded-full flex items-center justify-center"
                                onPress={() => console.log("Camera Pressed")}
                            >
                                <Cam color={'white'} size={25} />
                            </TouchableOpacity>
                            <TouchableOpacity 
                                className="border-white p-3 border rounded-full"
                                onPress={openFilePicker}
                            >
                                <File color={'white'} size={25} />
                            </TouchableOpacity>
                        </View>
                )}
            </View>

            <TextInput 
                className={isKeyboardActive 
                    ? "w-[75%] border-white border p-3 rounded-full text-white"
                    : "border-white w-[60%] border p-3 rounded-full text-white"
                }
                id='chatInput'
                onFocus={() => setIsKeyboardActive(true)} 
                onBlur={() => setIsKeyboardActive(false)}
                onTouchStart={() => setIsKeyboardActive(true)}
                value={chatValue}
                onChangeText={(text) => {
                    setChatValue(text)
                }}
                onChange={() => {
                    setIsKeyboardActive(true)
                }}
                placeholder="Search" 
                placeholderTextColor={'white'}
            />
            <TouchableOpacity
                    onPressIn={() => setIsChatActive(true)}
                    onPress={isChatActive ? displayChat : () => {console.log("not chat active")}}
                    className="border-gray-500 border p-3 rounded-full flex items-center justify-center bg-white"
            >
                <ArrowRight color={'gray'} size={25} />
            </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default Homework
