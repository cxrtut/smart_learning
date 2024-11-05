import { View, Text, TextInput, TextInputProps } from 'react-native'
import React from 'react'

const CustomInput = ({
  value, 
  className, 
  placeholder, 
  setValue
}: {
  value: string, 
  className: string, 
  placeholder: string, 
  setValue: () => void
}) => {
  return (
    <TextInput
        className={`pl-5 text-white border-b-[1px] rounded-lg border-white p-5 w-[90%] ${className}`}
        onChangeText={setValue}
        value={value}
        placeholder={placeholder}
        placeholderTextColor={'white'}
    />
  )
}

export default CustomInput