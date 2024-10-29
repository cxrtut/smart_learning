import { View, Text } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import React from 'react'
import { TouchableOpacity } from 'react-native'


const CustomHeader = () => {
  return (
    <View className='w-full items-center flex'>
      <View className='w-full items-center flex flex-row p-3'>
        {/* <TouchableOpacity className='mr-5'>
          <Ionicons name={'menu'} size={40} color={'white'} />
        </TouchableOpacity> */}
        <Text className='ml-3 text-4xl font-light text-white'>
          Hello Muzi
        </Text>
      </View>
    </View>
  )
}

export default CustomHeader