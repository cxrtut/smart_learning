import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import colors from '@/constants/colors'
import { SafeAreaView } from 'react-native-safe-area-context'
import Checkbox from 'expo-checkbox';
import BouncyCheckbox from "react-native-bouncy-checkbox";

const Subjects = () => {
  const [isChecked, setChecked] = useState(false);
  return (
    <SafeAreaView 
                style={{backgroundColor: colors.PRIMARY}}
                className='flex h-full items-center justify-between py-3 pb-10'
            >
            <View className='flex pl-3 items-start gap-y-14 w-full'>
                <Text 
                className='text-start p-3 pl-5 font-bold text-white text-3xl'
                >
                Smart Learning
                </Text>

                <View className='w-full pl-3 flex gap-3'>
                    <Text className='pl-1 text-white font-semibold text-lg'>
                        What is your Grade range?
                    </Text>
                    <View className='flex w-full flex-row gap-x-10'>
                    <BouncyCheckbox
                        size={25}
                        fillColor="black"
                        unFillColor="#FFFFFF"
                        text="Custom Checkbox"
                        iconStyle={{ borderColor: "grey" }}
                        innerIconStyle={{ borderWidth: 2 }}
                        onPress={(isChecked: boolean) => {console.log(isChecked)}}
                    />
                    </View>
                </View>
            </View>

            <View className='w-full gap-y-5 flex flex-col items-center'>
                <TouchableOpacity
                    className='flex items-center justify-center bg-white px-4 p-4 rounded-full mt-[-25%] w-[70%]' 
                    onPress={() => {}}
                >
                    <Text
                        style={{color: colors.PRIMARY}}
                        className='font-bold text-lg'
                    >
                        Next
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
  )
}

export default Subjects