import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { ReactNode, useState } from 'react'
import colors from '@/constants/colors'
import { SafeAreaView } from 'react-native-safe-area-context'
import BouncyCheckbox from "react-native-bouncy-checkbox";
import CustomCheckboxLabel from '@/components/CustomCheckboxLabel';
import { useOnboarding } from '@/context/onboardingContext';
import { getSubjectsByGrade } from '@/utils';


const Subjects = () => {
    const {gradeRange, subjects} = useOnboarding();
    const [isChecked, setChecked] = useState(false);

    const resultSubjects = getSubjectsByGrade(gradeRange);

  return (
    <SafeAreaView 
                style={{backgroundColor: colors.PRIMARY}}
                className='flex h-full items-center justify-between py-3 pb-10'
            >
            <View className='flex pl-3 items-start gap-y-3 w-full'>
                <Text 
                className='text-start p-3 pl-5 font-bold text-white text-3xl'
                >
                Smart Learning
                </Text>

                <View className='w-full pl-3 flex flex-col'>
                    <Text className='pl-1 text-white font-semibold text-sm mb-5'>
                        What is your Grade range?
                    </Text>
                    
                    <ScrollView className='flex w-full flex-col'>
                        {resultSubjects!.map((subject) => (
                            <BouncyCheckbox
                                id={subject.id}
                                key={subject.id}
                                size={25}
                                fillColor={'gray'}
                                unFillColor="#FFFFFF"
                                textComponent={<CustomCheckboxLabel label={subject.subject} />}
                                textStyle={{color: 'white'}}
                                className='mb-3'
                                onPress={(check: boolean) => {
                                    
                                    
                                }}
                            />
                        ))}
                    </ScrollView>
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