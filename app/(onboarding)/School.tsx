import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import React, { useState } from 'react'
import { Href, router } from 'expo-router'
import { useOnboarding } from '@/context/OnboardingProvider'
import {Picker} from '@react-native-picker/picker';

const schoolLevels = [
    {label: 'Primary', value: '1'},
    {label: 'Secondary', value: '2'},
]


const School = () => {
    const {setSchoolLevel} = useOnboarding()
    const [selctedSchoolLevel, setSelectedSchoolLevel] = useState('');

    const MoveToNextSection = () => {
        if (!selctedSchoolLevel) {
            Alert.alert('Error', 'Please select a school level')
            return
        }
        // TODO: Add school level to user profile
        router.push('/(onboarding)/Grade' as Href)
    }
    return (
        <View className='flex h-full items-center justify-between py-3 pb-10 bg-slate-300'>
            <View className='flex pl-3 items-start gap-y-3 w-full'>
                <Text 
                    className='text-start p-3 pl-5 text-gray-500 font-thin text-3xl'
                >
                    Smart Learning
                </Text>
                <View className='w-full pl-3 flex gap-3'>
                    <Text className='pl-1 text-gray-700 font-semibold text-sm'>
                        What is your schooling level?
                    </Text>
                    <Picker
                        selectedValue={selctedSchoolLevel}
                        onValueChange={(itemValue, itemIndex) =>
                            setSelectedSchoolLevel(itemValue)
                    }>
                        {schoolLevels.map((item, index) => (
                            <Picker.Item label={item.label} value={item.value} key={index} />
                        ))}
                    </Picker>
                </View>
            </View>

            <View className='w-full gap-y-5 flex flex-col items-center'>
                <TouchableOpacity
                    className='flex items-center justify-center bg-slate-500 px-4 p-4 rounded-full mt-[-25%] w-[70%]' 
                    onPress={() => MoveToNextSection()}
                    onPressIn={() => setSchoolLevel(selctedSchoolLevel)}
                >
                    <Text
                        className='font-bold text-lg text-white'
                    >
                        Next
                    </Text>
                    
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default School
