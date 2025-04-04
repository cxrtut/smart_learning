import { View, Text, TextInput } from 'react-native'
import React, { useState } from 'react'

const ChatTextInput = ({input}: {input: string}) => {
    const [height, setHeight] = useState(35)
    const [margin, setMargin] = useState(0)

    return (
        <TextInput
            multiline
            className='w-full flex-1 p-2 bg-[#bbc6ff]'
            onContentSizeChange={(event) => {
                const newHeight = Math.max(35, event.nativeEvent.contentSize.height);
                setHeight(newHeight);
                setMargin(Math.max(0, 120 - margin));
            
            }}
            style={{ height: height, backgroundColor: '#bbc6ff' }}
            placeholder='Type a message...'
        />
    )
}

export default ChatTextInput