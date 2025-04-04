import { View, Text, TextInput, Image, StatusBar, TouchableOpacity, Alert, AppState, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import Animated, { FadeIn, FadeInDown, FadeInUp, FadeOut } from 'react-native-reanimated'
import { Href, router } from 'expo-router'
import AntDesign from '@expo/vector-icons/AntDesign';
import { supabase } from '@/lib/supabase';
import { useAuthContext } from '@/context/AuthProvider';
import { makeRedirectUri } from "expo-auth-session";
import * as QueryParams from "expo-auth-session/build/QueryParams";
import * as WebBrowser from "expo-web-browser";

AppState.addEventListener('change', (state) => {
    if (state === 'active') {
      supabase.auth.startAutoRefresh()
    } else {
      supabase.auth.stopAutoRefresh()
    }
})

WebBrowser.maybeCompleteAuthSession(); // required for web only
const redirectTo = makeRedirectUri({
    scheme: 'com.tshiamotodd.sidetest',
});

const createSessionFromUrl = async (url: string) => {
    const { params, errorCode } = QueryParams.getQueryParams(url);
  
    if (errorCode) throw new Error(errorCode);
    const { access_token, refresh_token } = params;

    console.log({access_token, refresh_token})
  
    if (!access_token) return;
  
    const { data, error } = await supabase.auth.setSession({
      access_token,
      refresh_token,
    });
    if (error) throw error;
    console.log("Session data: ",{data})
    console.log("Session user: ", data.session?.user)
    return data.session;
};



const SignUp = () => {
    const {setUsername} = useAuthContext()
    const [isLoading, setIsLoading] = useState(false)
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const performOAuth = async () => {
        const { data, error } = await supabase.auth.signInWithOAuth({
          provider: "google",
          options: {
            redirectTo: `${redirectTo}SignIn`,
            skipBrowserRedirect: true,
          },
        });
    
        if (error) throw error;
      
        if(data) {
            console.log("Data from signInWithOAuth: ", {data})
    
            const res = await WebBrowser.openAuthSessionAsync(
                data?.url ?? "",
                redirectTo,
            );
    
    
            if (res.type === "success") {
                setIsLoading(true)
                console.log("Response from browser",{res})
    
                const { url } = res;
                console.log("Browser respose url", {url})
                const session = await createSessionFromUrl(url);
    
                console.log("Session user: ", session?.user.id)
    
                if(session?.user) {
                    const {data: userData, error: userError} = await supabase
                    .from('User')
                    .select('username')
                    .eq('id', session.user.id)
                    .single()
    
                    console.log({userData})
    
                    if(userData == null) {
                        const {data: createUserData, error: userError} = await supabase.from('User').insert([{
                            id: session.user.id,
                            email: session.user.email,
                            username: session.user.user_metadata.name
                        }]).select()
        
                        console.log(createUserData)
        
                        setUsername!(session.user.user_metadata.name)

                        if(createUserData) {
                            setIsLoading(false)
                            router.push('/(onboarding)/School' as Href)
                        }
                    } else {
                        setUsername!(userData?.username)
                        setIsLoading(false)
                        router.dismissAll()
                        router.replace('/Home')
                    }
                
                }
            }
        }
      
    };

    const onSignUpWithSupabase = async () => {
        try {
            setIsLoading(true)
            const {data, error} = await supabase.auth.signUp({
                email: form.email,
                password: form.password
            })

            if (error) {
                Alert.alert('Error', error.message)
            }

            if (data) {
                const userId = data.user?.id
                const userEmail = data.user?.email

                const {data: userData, error: userError} = await supabase.from('User').insert([{
                    id: userId,
                    email: userEmail,
                    username: form.name,
                    role: 'Student'
                }]).select()

                console.log(userData)

                setUsername!(form.name)
            

                //Alert.alert('Success', 'Account created successfully')
                router.push('/(onboarding)/School' as Href)

            }
        } catch (error) {
            console.log(error)
            console.log("Running catch block")
            Alert.alert('Error', error as string)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <View className='bg-white h-full w-full'>
            <StatusBar barStyle={'light-content'} />
        <Image
            className='h-full w-full absolute'
            source={require('@/assets/images/background.png')}
        />
        {/* Lights */}
        <View className='flex-row justify-around w-full absolute'>
            <Animated.Image
                entering={FadeInUp.delay(200).duration(1000).springify()}
                className='h-[225] w-[90]'
                source={require('@/assets/images/light.png')}
            />
            <Animated.Image
                entering={FadeInUp.delay(400).duration(1000).springify()}
                className='h-[160] w-[65]'
                source={require('@/assets/images/light.png')}
            />
        </View>

        {/* Titile and form */}
        <View className='h-full w-full flex justify-around pt-48'>
            {/* Title */}
            <View className='flex items-center'>
                <Animated.Text
                    entering={FadeInUp.delay(100).duration(1000).springify()} 
                    className='text-white font-bold tracking-wider text-4xl'
                >
                    Smart Learning
                </Animated.Text>
                <Animated.Text 
                    entering={FadeInUp.delay(100).duration(1000).springify()} 
                    className='text-white text-lg font-light px-7'
                >
                    SignUp to learn Anything, Anywhere
                </Animated.Text>
            </View>

            <Animated.View
                className='w-full'
                entering={FadeInDown.delay(400).duration(1000).springify()}
            >
                <TouchableOpacity 
                    className='bg-white shadow-md shadow-zinc-300 rounded-full py-4 mt-5'
                    onPress={performOAuth}
                >
                <View className='flex flex-row items-center justify-center'>
                    <Image
                        source={require('@/assets/images/google.png')}
                        className='w-8 h-8'
                        resizeMode='contain'
                    />
                        {isLoading ? (
                            <ActivityIndicator size='large' color='white'/>
                        ): (
                            <Text className='text-lg font-rubik-medium text-black-300 ml-2'>Continue With Google</Text>
                        )}
                </View>

                </TouchableOpacity>
            </Animated.View>
            {/* Form */}
            <View className='flex items-center mx-4 space-y-4 mt-6'>
                <Animated.View 
                    entering={FadeInDown.delay(200).duration(1000).springify()}
                    className='flex-row items-center border border-slate-300 gap-x-2 bg-black/5 p-5 rounded-full w-full'
                >
                    <AntDesign name="user" size={20} color="gray" />
                    <TextInput
                        value={form.name}
                        onChangeText={newName => setForm({...form, name: newName})}
                        placeholder='Username'
                        placeholderTextColor='gray'
                    />
                </Animated.View>

                <Animated.View 
                    entering={FadeInDown.delay(400).duration(1000).springify()}
                    className='flex-row items-center border border-slate-300 gap-x-2 bg-black/5 p-5 rounded-full w-full'
                >
                    <AntDesign name="mail" size={20} color="gray" />
                    <TextInput
                        value={form.email}
                        onChangeText={newEmail => setForm({...form, email: newEmail})}
                        placeholder='Email'
                        placeholderTextColor='gray'
                    />
                </Animated.View>

                <Animated.View 
                    entering={FadeInDown.delay(600).duration(1000).springify()} 
                    className='flex-row items-center border border-slate-300 gap-x-2 bg-black/5 p-5 rounded-full w-full'
                >
                    <AntDesign name="unlock" size={20} color="gray" />
                    <TextInput
                        value={form.password}
                        onChangeText={newPassword => setForm({...form, password: newPassword})}
                        placeholder='Password'
                        placeholderTextColor='gray'
                        secureTextEntry={true}

                    />
                </Animated.View>

                <Animated.View 
                    className='w-full'
                    entering={FadeInDown.delay(800).duration(1000).springify()}
                >
                    <TouchableOpacity
                        className='w-full bg-sky-400 p-3 rounded-full mb-3'
                        onPress={onSignUpWithSupabase}
                    >
                        {isLoading ? (
                            <ActivityIndicator size='large' color='white' />
                        ): (
                            <Text className='text-xl font-bold text-white text-center'>SignUp</Text>
                        )}
                    </TouchableOpacity>
                </Animated.View>

                <Animated.View 
                    className='flex-row justify-center'
                    entering={FadeInDown.delay(1000).duration(1000).springify()}
                >
                    <Text>Already have an account?</Text>
                    <TouchableOpacity
                        onPress={() => {
                            router.push('/(auth)/SignIn' as Href)
                        }}
                    >
                        <Text className='text-sky-600'> Login</Text>
                    </TouchableOpacity>
                </Animated.View>
            </View>
        </View>
        </View>
    )
}

export default SignUp