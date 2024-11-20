import { View, Text, KeyboardAvoidingView, Platform, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'
import { useLocalSearchParams } from 'expo-router';
import { useOnboarding } from '@/context/onboardingContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomHeader from '@/components/CustomHeader';
import colors from '@/constants/colors';
import { ScrollView } from 'react-native';

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
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(true);

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
        keyboardVerticalOffset={100}
        className={'flex-1 bg-gray-100'}>
      
      <ScrollView>
        
      </ScrollView>
      <View className={'flex-row p-2'}>
        <TextInput
          className={'flex-1 p-8 px-4 py-2 border border-black-400 rounded-lg'}
          placeholder="Ask me a question..."
          value={inputText}
          onChangeText={setInputText}
        />
        <TouchableOpacity >
          
        </TouchableOpacity>
      </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default Homework
