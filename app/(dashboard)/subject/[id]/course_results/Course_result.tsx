import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import tailwind from 'twrnc';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const Course_result = () => {
  const [videos, setVideos] = useState([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const navigation = useNavigation();

  useEffect(() => {
    console.log('Fetching videos from the API...');
    // Replace 'YOUR_API_URL' with your actual API endpoint
    axios.get('YOUR_API_URL')
      .then(response => {
        console.log('API response received:', response.data);
        setVideos(response.data);
      })
      .catch(error => {
        console.error('Error fetching videos:', error);
      });
  }, []);

  console.log('Rendered videos:', videos);

  const handleNext = () => {
    if (currentVideoIndex < videos.length - 1) {
      setCurrentVideoIndex(currentVideoIndex + 1);
      console.log('Next video index:', currentVideoIndex + 1);
    } else {
      console.log('Reached the end of the video list.');
    }
  };

  const handlePrevious = () => {
    if (currentVideoIndex > 0) {
      setCurrentVideoIndex(currentVideoIndex - 1);
      console.log('Previous video index:', currentVideoIndex - 1);
    } else {
      console.log('Already at the first video.');
    }
  };

  return (
    <View style={tailwind`flex-1 bg-blue-500 p-4`}>
      <Text style={tailwind`text-white text-2xl font-bold mb-4`}> Search Result</Text>
      <TouchableOpacity 
        style={tailwind`mb-4 p-2 bg-white rounded-full shadow-md`} 
        onPress={() => navigation.navigate('ResultPage')}
      >
        <Text style={tailwind`text-blue-500 font-bold`}>Go to Result Page</Text>
      </TouchableOpacity>
      {videos.length > 0 && (
        <View style={tailwind`w-full bg-white rounded-lg shadow-lg p-2`}>
          <Image
            source={{ uri: videos[currentVideoIndex].thumbnail }}
            style={tailwind`w-full h-40 rounded-md`}
          />
          <Text style={tailwind`text-lg font-semibold mt-2`}>{videos[currentVideoIndex].title}</Text>
          <Text style={tailwind`text-gray-600 mt-1`}>{videos[currentVideoIndex].transcript}</Text>
        </View>
      )}
      <View style={tailwind`flex-row justify-between mt-4`}>
        <TouchableOpacity style={tailwind`p-2 bg-white rounded-full shadow-md`} onPress={handlePrevious}>
          <Text style={tailwind`text-blue-500 font-bold`}>Previous</Text>
        </TouchableOpacity>
        <TouchableOpacity style={tailwind`p-2 bg-white rounded-full shadow-md`} onPress={handleNext}>
          <Text style={tailwind`text-blue-500 font-bold`}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Course_result;
