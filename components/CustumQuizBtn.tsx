import { View, Text, Pressable } from 'react-native'
import React from 'react'

const CustumQuizBtn = ({
    selectedOption, 
    option, 
    isCorrect,
    key,
    onPress
}: {
    selectedOption: string | null, 
    option: string, 
    isCorrect: boolean | null,
    key: number,
    onPress: () => void
}) => {

    console.log('Render CustumQuizBtn')
    console.log('isCorrect', isCorrect)
    console.log('selectedOption', selectedOption)
    console.log('option', option)
  return (
    <Pressable
        key={key}
        disabled={!!selectedOption}
        className={`border-[#5470FD] border p-4 my-2 rounded-md ${
            selectedOption === option 
            ? isCorrect 
                ? 'border-[#10b981] bg-[#d1fae5]'
                : 'border-[#ef4444] bg-[#fecaca]'
                : 'border-[#5470FD]'
        }`}
    >   
        <Text className='text-md'>{option}</Text>
    </Pressable>
  )
}

export default CustumQuizBtn
