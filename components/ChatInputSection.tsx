import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import React, { Dispatch, SetStateAction, useState } from 'react'
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { ArrowRight, Camera as Cam, File, Plus } from "lucide-react-native";
import { useRouter } from 'expo-router'

const ChatInputSection = ({
    isChatActive, 
    setIsChatActive,
    onContinue,
    value,
    setInputText,
    sendMessage
} : {
    isChatActive: boolean,
    setIsChatActive: React.Dispatch<React.SetStateAction<boolean>>,
    onContinue?: () => void,
    value?: string,
    setInputText?: Dispatch<SetStateAction<string>>,
    sendMessage?: () => Promise<void>
}) => {

    const [isKeyboardActive, setIsKeyboardActive] = useState(false)
    const [fileName, setFileName] = useState("")
    const [fileContents, setfileContents] = useState("")

    const displayChat = () => {
        setInputText!('')
        sendMessage!()
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
        <View className="flex flex-row w-full gap-x-2 p-0 pt-0 m-0 items-center justify-between">
            <View className={isKeyboardActive ? `flex-[0.2] p-0` : `flex-[0.3]`}>
                {isKeyboardActive ? (
                    <View className='flex py-[5px] p-4'>
                        <TouchableOpacity
                            onPress={() => setIsKeyboardActive(false)}
                            className="border-white border p-3 w-[100%] rounded-full flex items-center justify-center"
                        >
                            <Plus color={'white'} size={25} />
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View className="flex flex-row gap-x-1 py-[5px] p-4">
                        <TouchableOpacity
                            className="border-white border p-3 rounded-full"
                            onPress={onContinue}
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

            <View className={isKeyboardActive ? `flex-[0.8]` : `flex-[0.7]`}>
                <View className='flex flex-row items-center justify-between py-[5px]'>
                    <TextInput
                        className={isKeyboardActive
                            ? "w-[80%] border-white border p-3 rounded-full text-white"
                            : "border-white w-[75%] border p-3 rounded-full text-white"
                        }
                        id="chatInput"
                        onFocus={() => setIsKeyboardActive(true)}
                        onBlur={() => setIsKeyboardActive(false)}
                        onTouchStart={() => setIsKeyboardActive(true)}
                        value={value}
                        onChangeText={(text) => setInputText!(text)}
                        onChange={() => {
                            setIsKeyboardActive(true);
                        }}
                        placeholder="Ask me something..."
                        placeholderTextColor="white"
                    />
                    <TouchableOpacity
                        onPressIn={() => setIsChatActive(true)}
                        onPress={
                            isChatActive ? displayChat : () => console.log("not chat active")
                        }
                        className="border-gray-500 border p-3 mr-2 rounded-full flex items-center justify-center bg-white"
                    >
                        <ArrowRight color="gray" size={25} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default ChatInputSection