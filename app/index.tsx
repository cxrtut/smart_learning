import { View, Text, Pressable, Image, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Href, Redirect, router } from 'expo-router'
import { useAuthContext } from '@/context/AuthProvider';
import { supabase } from '@/lib/supabase';

const Index = () => {
    const { width, height } = Dimensions.get('window');
    const { isAuthenticated, setUsername, user } = useAuthContext()
    const [isLoading, setIsLoading] = useState(false)

    

    useEffect(() => {
      setIsLoading(true)
      console.log('isAuthenticated', isAuthenticated)
      const fetchUser = async () => {
        const {data: userData, error: userError} = await supabase
        .from('User')
        .select('username')
        .eq('email', user?.email)
        .single()

        if(userError) {
          console.log('userError', userError)
          setIsLoading(false)
        }
  
        if(userData){
          setUsername!(userData?.username.toString())
          router.push('/(dashboard)/(home)/Home' as Href)
          setIsLoading(false)
        } else {
          console.log('userError', userError)
          setIsLoading(false)
        }
        return
      }

      if(isAuthenticated){
        fetchUser()
      } else {
        setIsLoading(false)
      }
    }, [])

    if(isLoading){
      return (
        <View className='flex-1 items-center justify-center'>
          <ActivityIndicator size='large' color='purple' />
        </View>
      )
    }

    return (
      <View className="flex h-full items-center justify-between py-3 pb-10 bg-slate-100">
        {/* Header Section */}
        <View className="w-full px-5">
          <Text className="font-semibold text-[#5470FD] text-2xl">
            Smart Learning
          </Text>
        </View>

        {/* Image Section */}
        <View className="items-center mt-[-20]">
          <Image
            source={require('../assets/images/splash_image.png')}
            style={{
              width: width * 0.9, // 90% of screen width
              height: height * 0.4, // 40% of screen height
            }}
            resizeMode="contain"
          />
        </View>

        {/* Text Section */}
        <View className='flex items-center'>
              <Text className='text-center text-[#5470FD] text-4xl px-7 font-bold'>
              Learn Anything Anytime Anywhere
              </Text>
          
              <Text className='text-center text-lg mt-2 px-7'>
                  Learning just a click away, Online learning is education that takes place over the internet.
              </Text>
          </View>

        {/* Button Section */}
        <TouchableOpacity
          className="bg-slate-500 items-center justify-center rounded-full"
          style={{
            width: width * 0.7, // 70% of screen width
            paddingVertical: height * 0.02, // Adjust padding based on height
          }}
          onPress={() => {
            router.push('/(auth)/SignIn')
          }}
        >
          <Text className="font-bold text-white text-lg">Get Started</Text>
        </TouchableOpacity>
      </View>
    )
}

export default Index