import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { Message } from '@/context/MessageProvider';

const RenderChatScreen = ({messages}: {messages: Message[]}) => {

    const renderMessage = ({ item }: { item: Message}) => {
        return (
        <View
            key={item.id}
            style={{
                alignSelf: item.sender === "user" ? "flex-end" : "flex-start",
                backgroundColor: item.sender === "user" ? "#afbcff" : "#636360",
                padding: 10,
                borderRadius: 10,
                marginVertical: 5,
                maxWidth: "75%",
                width: '100%'
            }}
            className='flex flex-col'
        >
            <Text style={{ color: item.sender === "user" ? "white" : "white" }} className='text-sm'>
                {item.content}
            </Text>
            <Text className='text-[10px] text-gray-200 text-right'>
                {Date.now()}
            </Text>
      </View>
    )}

    return (
        <View className='bg-[#e0e1e6] p-5 flex-1 w-full'>
            <FlatList
                className = {'flex-1 p-0 mt-2 w-full'}
                data = {messages}
                renderItem={renderMessage}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ paddingBottom: 10 }}
            />
        </View>
    )
    }

export default RenderChatScreen