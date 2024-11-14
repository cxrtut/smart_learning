import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "@/constants/colors";

const Course_result = () => {
    const [videos, setVideos] = useState([]);
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    const navigation = useNavigation();


    const handleNext = () => {
        if (currentVideoIndex < videos.length - 1) {
            setCurrentVideoIndex(currentVideoIndex + 1);
        } else {
            console.log('Reached the end of the video list.');
        }
    };

    const handlePrevious = () => {
        if (currentVideoIndex > 0) {
            setCurrentVideoIndex(currentVideoIndex - 1);
        } else {
            console.log('Already at the first video.');
        }
    };

    return (
        <SafeAreaView style={{ backgroundColor: colors.PRIMARY, flex: 1 }}>

            <TouchableOpacity
                style={{ marginBottom: 16, padding: 8, backgroundColor: 'white', borderRadius: 999, shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 5 }}
                onPress={() => navigation.navigate('ResultPage')}
            >
                <Text style={{ color: '#3b82f6', fontWeight: 'bold' }}>Go to Result Page</Text>
            </TouchableOpacity>

            {videos.length > 0 && (
                <View style={{
                    width: '90%',
                    backgroundColor: 'white',
                    borderRadius: 16,
                    padding: 16,
                    shadowColor: '#000',
                    shadowOpacity: 0.2,
                    shadowRadius: 8,
                    alignSelf: 'center',
                    marginTop: 16
                }}
                >
                    <Image
                        source={{ uri: videos[currentVideoIndex]["thumbnail"] }}
                        style={{ width: 400, height: 600, borderRadius: 12 }}
                    />
                    <Text style={{ fontSize: 18, fontWeight: '600', marginTop: 8 }}>{videos[currentVideoIndex]["title"]}</Text>

                    <View style={{
                        width: 200,
                        height: 200,
                        marginTop: 8,
                        padding: 8,
                        backgroundColor: '#f9fafb',
                        borderRadius: 12
                    }}
                    >
                        <Text style={{ color: '#4b5563' }}>{videos[currentVideoIndex]["transcript"]}</Text>
                    </View>
                </View>
            )}

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 16 }}>
                <TouchableOpacity
                    style={{ padding: 8, backgroundColor: 'white', borderRadius: 999, shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 5 }}
                    onPress={handlePrevious}
                >
                    <Text style={{ color: '#3b82f6', fontWeight: 'bold' }}>Previous</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{ padding: 8, backgroundColor: 'white', borderRadius: 999, shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 5 }}
                    onPress={handleNext}
                >
                    <Text style={{ color: '#3b82f6', fontWeight: 'bold' }}>Next</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default Course_result;
