import { View, Text, TouchableOpacity, ImageSourcePropType } from 'react-native'
import React from 'react'
import { Image } from 'react-native'

const CustomCard = ({
  label,
  subTitle,
  headerImage, 
  headingStyle,
  onPressAction,
  isUrl,
  customStyles
}: {
  label: string,
  subTitle?: string,
  headingStyle?: string,
  isUrl?: boolean,
  headerImage?: ImageSourcePropType, 
  onPressAction?: () => void,
  customStyles?: string
}) => {

  return (
    <TouchableOpacity 
        onPress={onPressAction}
        className={`block rounded-lg shadow-sm bg-white shadow-indigo-100 w-full mb-2 ${customStyles}`}
    >
      
        { headerImage && <Image 
            source={headerImage} 
            className='rounded-t-md w-full h-20 object-cover mb-1'
        />}
        <View className='p-4'>
          <Text className={`font-semibold ${headingStyle}`}>
              {label}
          </Text>
          {subTitle && <Text className='font-normal text-sm'>
              {subTitle}
          </Text>}
        </View>
    </TouchableOpacity>
  )
}

export default CustomCard