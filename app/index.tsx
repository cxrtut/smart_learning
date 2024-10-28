import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import colors from '@/constants/colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'tailwind-react-native-classnames'; // Import tailwind

const SplashScreen = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={[tw`flex-1 justify-between p-4`, { backgroundColor: colors.PRIMARY }]}>
      {/* Top Text Section */}
      <View style={tw`w-full pl-5`}>
        <Text style={tw`text-white text-2xl font-bold`}>Smart Learning</Text>
      </View>

      {/* Image Section */}
      <Image
        source={require('../assets/images/onboarding13.png')}
        style={tw`w-80 h-80 self-center -ml-8`} 
        resizeMode="cover"
      />

      {/* Bottom Text Section */}
      <View style={tw`items-center px-5 mb-8`}>
        <Text style={tw`text-white text-lg font-bold text-center`}>
          Learn Anything, Anytime, Anywhere
        </Text>
        <Text style={tw`text-white text-xs mt-2 text-center`}>
          Learning just a click away, Online learning is education that takes place over the internet.
        </Text>
      </View>

      {/* Button Section */}
      <TouchableOpacity
        style={tw`bg-white py-4 px-20 rounded-full self-center mb-10 w-3/4 items-center`}
        onPress={() => router.push('/(auth)/SignIn')}
      >
        <Text style={[tw`font-bold text-base`, { color: colors.PRIMARY }]}>
          Get Started
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default SplashScreen;
