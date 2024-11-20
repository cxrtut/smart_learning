import { View,  ScrollView, FlatList, Text, KeyboardAvoidingView, Platform, TouchableOpacity, TextInput } from 'react-native'
import React, { useEffect,useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { useOnboarding } from '@/context/onboardingContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomHeader from '@/components/CustomHeader';
import colors from '@/constants/colors';
import OpenAI from 'openai';



interface Message{
  id: string;
  type: 'text';
  content: string;
  sender: 'user' | 'system';
}

const openai = new OpenAI({
  apiKey: "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",
})

const Homework = () => {
  const {id} = useLocalSearchParams<{id:string}>();
  const {activeSubject} = useOnboarding();

  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () =>{
    if(inputText.trim().length === 0) return;

    // add a message
    const userMessage: Message = { id: Date.now().toString(), type: 'text', content: inputText, sender: 'user' };
    setMessages((prev) => [...prev, userMessage]);
    setInputText('');

    // generate ai response
    setLoading(true);
    try{
      const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages:[
          { role: 'system', content: 'You are a helpful assistant.' },
          ...messages.map((msg) => ({
            role: msg.sender === 'user' ? 'user' : 'assistant',
            content: msg.content,
          })),
          { role: 'user', content: inputText },
        ],
      });

      const aiMessage: Message = {
        id: Date.now().toString(),
        type: 'text',
        content: response.choices[0]?.message?.content || 'Sorry, I did not understand that.',
        sender: 'system',
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error){
      console.error('Error generating AI response:', error);
    } finally{
      setLoading(false);
    }
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <View
      className={`my-1 p-2 rounded-lg max-w-3/4 ${
        item.sender === 'user' ? 'bg-blue-500 self-end' : 'bg-gray-300 self-start'
      }`}
    >
      <Text className={item.sender === 'user' ? 'text-white' : 'text-black'}>
        {item.content}
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
