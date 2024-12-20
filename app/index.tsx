import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { Href, Redirect, router } from 'expo-router';
import colors from '@/constants/colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '@clerk/clerk-expo';

const SplashScreen = () => {
  const { isSignedIn } = useAuth()

  if (isSignedIn) {
    return <Redirect 
        href={'/(dashboard)/(home)/Home' as Href} 
    />
  }
  return (
    <SafeAreaView style={{ backgroundColor: colors.PRIMARY }} className='flex h-full items-center justify-between py-3 pb-10'>
      
      <View className='flex items-start w-full'>
        <Text className='text-start p-3 pl-5 font-semibold text-white text-2xl'>
          Smart Learning
        </Text>
      </View>

      <View className='flex items-center mt-[-110]'>
        <Image
          source={require('../assets/images/onboarding13.png')}
          style={{ width: 400, height: 650 }}
          resizeMode='contain'
          className='ml-[-30]'
        />
      </View>

      
      <View className='flex items-center mt-[-70]'>
     <Text className='text-center text-white text-4xl px-7 font-bold'>
      Learn Anything Anytime Anywhere
     </Text>
  
  <Text className='text-center text-white text-lg mt-2 px-7'>
    Learning just a click away, Online learning is education that takes place over the internet.
  </Text>
  </View>

    <TouchableOpacity
        className='flex items-center justify-center bg-white px-4 p-4 rounded-full mt-auto w-[70%]' 
        onPress={() => {
          router.push('/(auth)/SignIn');
        }}
      >
        <Text style={{ color: colors.PRIMARY }} className='font-bold text-lg'>
          Get Started
        </Text>
      </TouchableOpacity>
      
    </SafeAreaView>
  );
};

export default SplashScreen;
