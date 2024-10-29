import { View, Text } from 'react-native'
import React from 'react'

const CustomCheckboxLabel = ({label}: {label: string}) => {
  return (
    <View
        className='flex items-start justify-center p-5 bg-white border-zinc-700 shadow-2xl rounded-xl w-[80%] ml-3'
    >
      <Text className='ml-3 font-semibold text-sm'>{label}</Text>
    </View>
  )
}

export default CustomCheckboxLabel