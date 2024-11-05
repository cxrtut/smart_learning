import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import colors from '@/constants/colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome'; 
import { router, Href } from 'expo-router';
import { useUser } from '@clerk/clerk-expo';

const Profile = () => {
    const {user} = useUser();

    const [name, setName] = useState(user?.firstName!);  // we use this to from the database the name
    const [email, setEmail] = useState(user?.emailAddresses[0].emailAddress!); // emails are stored in a array format
 
    return (
        <SafeAreaView style={{ backgroundColor: colors.PRIMARY, flex: 1 }}>
            <View style={{ padding: 16 }}>
                <Text style={{ fontSize: 30, color: 'white' }}>Smart Learning</Text>
            </View>

            <View style={{ alignItems: 'center', marginTop: 40 }}> 
                <FontAwesome name="user-circle" size={200} color="white" />
            </View>

            <View style={{ alignItems: 'center', marginTop: 20, marginLeft: -230 }}> 
                <Text className='text-white mt-1 text-2xl font-bold'>User Info</Text>
            </View>

            <View className='rounded-lg mt-2 border border-white' style={{ padding: 22, marginHorizontal: 15 }}>
            <TextInput
                value={name}
                onChangeText={setName}
                placeholder="Name"
                className='text-white text-lg font-bold border-b border-white mb-5 mt-1'
                style={{ color: 'white', fontSize: 18, borderBottomWidth: 1, borderBottomColor: 'white', marginBottom: 5 }}
            />
            <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="Email"
                keyboardType="email-address"
                className='text-white text-lg font-bold border-b border-white mb-5 mt-3'
                style={{ color: 'white', fontSize: 18, borderBottomWidth: 1, borderBottomColor: 'white', marginBottom: 5 }}
            />
            
        </View>

         
            <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: 160 }}>
                <TouchableOpacity
                    className='bg-white rounded-full py-4 px-8 items-center' 
                    style={{ alignSelf: 'center' }} 
                   
                >
                    <Text className='text-blue-600 text-lg font-semibold'>
                        Save Changes
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

export default Profile;
