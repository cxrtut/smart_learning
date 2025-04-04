import { View, Text, Image } from 'react-native'
import React, { useState } from 'react'
import CustomHeader from '@/components/CustomeHeader'
import ChatInputSection from '@/components/ChatInputSection'
import { useMessageContext } from '@/context/MessageProvider'
import RenderChatScreen from '@/components/RenderChatScreen'

const Homework = () => {
    const {messages} = useMessageContext()
    const [isChatActive, setIsChatActive] = useState(false)


  return (
        <View className='flex h-full w-full justify-between bg-slate-300'>
            <View className='flex w-full'>
                <CustomHeader  
                    title='Homework'
                    subtitle="Start a covresation with your AI teacher"
                    showBackButton={true}
                    headerStyles='pr-3'
                />
            </View>

            <View className='flex-1 items-center justify-center'>
                {(isChatActive || messages.length > 0) ? (
                    <RenderChatScreen 
                        messages={messages}
                    />
                ): (
                        <Image
                            source={require('@/assets/images/splash_image.png')}
                            className='w-3/4 h-3/4'
                            resizeMode="contain"
                        />
                )}
            </View>

            <ChatInputSection
                isChatActive={isChatActive} 
                setIsChatActive={setIsChatActive}
            />
        </View>
  )
}

export default Homework