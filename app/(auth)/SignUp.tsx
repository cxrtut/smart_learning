import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import React from 'react';
import { Href, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import colors from '@/constants/colors';
import Toast from 'react-native-toast-message';
import { isLoaded } from 'expo-font';
import { icons } from '@/constants';
import OAuth from './OAuth';
import { useAnimatedKeyboard } from 'react-native-reanimated';
import { useSignUp } from '@clerk/clerk-expo';

const SignUp = () => {
    const {isLoaded, SignUp, setActive } = useSignUp()

    const [form, setForm] = React.useState({
        name: '',
        email: '',
        phoneNumber: '',
        password: '',
        confirmPassword: ''
    });

    const onSignUpPress = async () => {
        console.log('Signing up');

        // Check if passwords match
        if (form.password === form.confirmPassword) {
            // TODO: Implement sign up functionality
            return;
        } else {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Passwords do not match'
            });
        }





      




        // Redirect to Sign In page
        // router.push('/(auth)/SignIn' as Href);
    };

    return (
        <SafeAreaView 
            style={{ backgroundColor: colors.PRIMARY }}
            className='flex h-full items-center justify-between py-3 pb-10'
        >
            <View className='flex pl-3 items-start gap-y-14 w-full'>
                <Text 
                    className='text-start p-3 pl-5 font-bold text-white text-3xl'
                >
                    Smart Learning
                </Text>

                <View className='w-full pl-3 flex gap-2'>
                    <Text className='pl-3 text-white font-semibold text-lg'>
                        Register
                    </Text>
                    <TextInput
                        className='pl-5 text-white border-b-[1px] rounded-xl border-white p-5 w-[90%]'
                        placeholder='Name'
                        value={form.name}
                        onChangeText={newName => setForm({...form, name: newName})}
                        textContentType='name'
                        placeholderTextColor='white'
                    />

                    <TextInput
                        className='pl-5 text-white border-b-[1px] rounded-lg border-white p-5 w-[90%]'
                        placeholder='Email'
                        value={form.email}
                        onChangeText={newEmail => setForm({...form, email: newEmail})}
                        textContentType='emailAddress'
                        placeholderTextColor='white'
                    />
                    <TextInput
                        className='pl-5 text-white border-b-[1px] rounded-lg border-white p-5 w-[90%]'
                        placeholder='Phone number'
                        value={form.phoneNumber}
                        onChangeText={newPhoneNumber => setForm({...form, phoneNumber: newPhoneNumber})}
                        textContentType='telephoneNumber'
                        placeholderTextColor='white'
                    />
                    <TextInput
                        className='pl-5 text-white border-b-[1px] rounded-lg border-white p-5 w-[90%]'
                        placeholder='Password'
                        value={form.password}
                        onChangeText={newPassword => setForm({...form, password: newPassword})}
                        textContentType='password'
                        secureTextEntry={true}
                        placeholderTextColor='white'
                    />
                    <TextInput
                        className='pl-5 text-white border-b-[1px] rounded-lg border-white p-5 w-[90%]'
                        placeholder='Confirm Password'
                        value={form.confirmPassword}
                        onChangeText={newConfirmPassword => setForm({...form, confirmPassword: newConfirmPassword})}
                        textContentType='password'
                        secureTextEntry={true}
                        placeholderTextColor='white'
                    />
                </View>
            </View>

            <View className='w-full gap-y-5 flex flex-col items-center'>
              
                <TouchableOpacity
                    className='flex items-center justify-center bg-white px-4 p-4 rounded-full mt-[-25%] w-[70%]' 
                    onPress={onSignUpPress}
                >
                    <Text
                        style={{ color: colors.PRIMARY }}
                        className='font-bold text-lg'
                    >
                        Sign Up
                    </Text>
                </TouchableOpacity>
                
                <OAuth />

                <TouchableOpacity
                    onPress={() => {
                        router.push('/(auth)/SignIn' as Href);
                    }}
                >
                    <Text className='text-white'>
                        Already have an account? Sign in 
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default SignUp;