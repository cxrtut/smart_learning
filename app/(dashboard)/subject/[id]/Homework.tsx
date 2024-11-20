import { View,  ScrollView, FlatList, Text, KeyboardAvoidingView, Platform, TouchableOpacity, TextInput } from 'react-native'
import React, { useEffect,useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { useOnboarding } from '@/context/onboardingContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomHeader from '@/components/CustomHeader';
import colors from '@/constants/colors';


interface Message{
  id: string;
  text: string;
  sender: 'user' | 'system';
}

const Homework = () => {
  const {id} = useLocalSearchParams<{id:string}>();
  const {activeSubject} = useOnboarding();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  const sendMessage = () =>{
    if(inputText.trim().length === 0) return;

    const newMessage: Message = {id: Date.now().toString(), text: inputText, sender: 'user'}
    setMessages(prev => [...prev, newMessage]);
    setInputText('');

    setTimeout(() => {
      const replyMessage: Message = {id: Date.now().toString(), text: "Hello user, this is an automated reply. Because the application documentation is in the developmental phase, this document needs to be updated as the project grows. For now to get everyone up to speed with tailwind CSS styling this document serves as a cheat-sheet for quick and easy reference when building the project.", sender: 'system' }
      setMessages(prev => [...prev, replyMessage]);
    }, 1000);
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <View
      className={`my-1 p-2 rounded-lg max-w-3/4 ${
        item.sender === 'user' ? 'bg-blue-500 self-end' : 'bg-gray-300 self-start'
      }`}
    >
      <Text className={item.sender === 'user' ? 'text-white' : 'text-black'}>
        {item.text}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={{backgroundColor: colors.PRIMARY}} className='flex h-full w-full'>
      <CustomHeader  
          title='Homework'
          subtitle={activeSubject?.subjectName}
          showBackButton={true}
          headerStyles='pr-3'
      />
        <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : undefined} 
            className = {'flex-1 bg-gray-100'}
            keyboardVerticalOffset={100}>

            <ScrollView>
            <FlatList
                className={'flex-1 p-8'}
                data={messages}
                renderItem={renderMessage}
                keyExtractor={(item) => item.id}
            />
            </ScrollView>
            <View className={`flex-row items-center border-t border-gray-300 p-2`}>
                <TextInput
                    className={`flex-1 border border-black-400 p-8 rounded-lg px-4 py-2`}
                    placeholder="Ask me a question..."
                    value={inputText}
                    onChangeText={setInputText}
                />
                <TouchableOpacity onPress={sendMessage} className={`ml-2 bg-blue-500 p-3 rounded-full`}>
                    <Text className={`text-white`}>Send</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default Homework
