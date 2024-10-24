import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import colors from '@/constants/colors'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Image, StyleSheet } from 'react-native';

const SplashScreen = () => {
  const router = useRouter(); // Correct import for expo-router
  
  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.PRIMARY }]}>
      {/* Top Text Section */}
      <View style={styles.topTextContainer}>
        <Text style={styles.titleText}>Smart Learning</Text>
      </View>

      {/* Image Section */}
      <Image
        source={require('../assets/images/onboarding13.png')}
        style={styles.image}
        resizeMode="cover"
      />

      {/* Bottom Text Section */}
      <View style={styles.bottomTextContainer}>
        <Text style={styles.mainText}>
          Learn Anything, Anytime, Anywhere
        </Text>
        <Text style={styles.subText}>
          Learning just a click away, Online learning is education that takes place over the internet.
        </Text>
      </View>

      {/* Button Section */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/(auth)/SignIn')} // Using expo-router navigation
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 10,
  },
  topTextContainer: {
    alignItems: 'flex-start',
    width: '100%',
    paddingHorizontal: 20,
  },
  titleText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  image: {
    width: 280, 
    height: 300, 
    alignSelf: 'center', 
    marginLeft: -20,
  },
  bottomTextContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  mainText: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subText: {
    color: 'white',
    fontSize: 12,
    marginTop: 10,
    textAlign: 'center',
  },
  button: {
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 25,
    alignSelf: 'center',
    marginBottom: 40,
    width: '70%',
    alignItems: 'center',
  },
  buttonText: {
    color: colors.PRIMARY,
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default SplashScreen;
