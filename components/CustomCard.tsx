import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const CustomCard = ({label, onPressAction}: {label: string, onPressAction?: () => void}) => {
  return (
    <TouchableOpacity 
        onPress={onPressAction}
        className='w-full p-5 mb-2 bg-white shadow-lg border-[0.5px] mx-5 rounded-lg'
    >
        <Text className='font-semibold text-md'>
            {label}
        </Text>
    </TouchableOpacity>
  )
}

export default CustomCard