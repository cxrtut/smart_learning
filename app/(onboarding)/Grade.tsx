import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import colors from '@/constants/colors';
import { Dropdown } from 'react-native-element-dropdown';
import { Href, router } from 'expo-router';
import { useOnboarding } from '@/context/onboardingContext';
import Toast from 'react-native-toast-message';

const primaryGradeLevels = [
  {label: 'Grade 1 - 3', value: '1'},
  {label: 'Grade 4 - 6', value: '2'},
  {label: 'Grade 7', value: '3'},
]
const secondaryGradeLevels = [
  {label: 'Grade 8 - 9', value: '1'},
  {label: 'Grade 10 - 12', value: '2'},
  {label: 'Grade 12', value: '3'},
]

const Grade = () => {
  const {schoolLevel, setGradeRange} = useOnboarding()
  const [value, setValue] = useState('');

  const MoveToNextSection = () => {
    if (!value) {
        Toast.show({
            type: 'error',
            text1: 'Error',
            text2: 'Please select a grade level'
        })
        return
    }
    // TODO: Add school level to user profile
    router.push('/(onboarding)/Subjects' as Href)
}
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
                    <Dropdown
                        style={styles.dropdown}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        data={schoolLevel === '1' ? primaryGradeLevels : secondaryGradeLevels}
                        search
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder="Select grade"
                        searchPlaceholder="Search..."
                        value={value}
                        onChange={item => {
                            setValue(item.value);
                        }}
                    />
                </View>
            </View>

            <View className='w-full gap-y-5 flex flex-col items-center'>
                <TouchableOpacity
                    className='flex items-center justify-center bg-white px-4 p-4 rounded-full mt-[-25%] w-[70%]' 
                    onPress={() => MoveToNextSection()}
                    onPressIn={() => setGradeRange(value)}
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

export default Grade

const styles = StyleSheet.create({
  dropdown: {
    paddingLeft: 5,
    margin: 16,
    height: 50,
    borderBottomColor: 'white',
    borderBottomWidth: 0.5,
    marginTop: 10,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
    color: 'white',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: 'white',
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
})