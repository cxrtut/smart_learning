import { View, Text } from 'react-native'
import React from 'react'

interface ProgressBarProps {
    progress: number
    height?: number
    padded?: boolean
}

const ProgressBar = ({
    progress, 
    height, 
    padded
}: ProgressBarProps) => {
  return (
    <View className={`w-full border rounded-xl items-start justify-center h-[${height}px] border-[#5470FD] ${padded ? 'p-1' : 'p-0'}`}>
      <View
        className={`rounded-xl h-[10px] bg-[#5470FD]`}
        style={{width: `${progress * 100}%`}}
      >
        <Text></Text>
      </View>
    </View>
  )
}

export default ProgressBar