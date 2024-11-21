import { View, Text, TextInput, TextInputProps } from 'react-native'
import React from 'react'

const CustomInput = ({
  value, 
  className, 
  placeholder, 
  onChangeText,
  textContentType,
  placeholderTextColor,
  secureTextEntry,
}: {
  value: string, 
  className?: string, 
  placeholder: string, 
  onChangeText?: (text: string) => void,
  textContentType?: TextInputProps['textContentType'],
  placeholderTextColor: string,
  secureTextEntry?: boolean
}) => {
  return (
    <TextInput
        className={`pl-5 text-white border-b-[1px] rounded-lg border-white p-5 w-[90%] ${className}`}
        onChangeText={onChangeText}
        value={value}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        textContentType={textContentType}
        secureTextEntry={secureTextEntry}
    />
  )
}

export default CustomInput