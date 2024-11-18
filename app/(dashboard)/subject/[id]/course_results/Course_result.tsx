import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Video } from "expo-av";

const Course_result = () => {
  const [videos, setVideos] = useState([
    {
      title: "React-Native",
      thumbnail: "https://www.w3schools.com/html/mov_bbb.mp4",
      transcript:
        "Welcome to our tutorial on React Native! In this video, we will cover basic components.",
    },
    {
      title: "Sample Video 2",
      thumbnail: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
      transcript: "This is the transcript of Sample Video 2.",
    },
    {
      title: "Sample Video 3",
      thumbnail: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_10mb.mp4",
      transcript: "This video discusses React Native in more detail.",
    },
  ]);

  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const handleNext = () => {
    if (currentVideoIndex < videos.length - 1) {
      setCurrentVideoIndex(currentVideoIndex + 1);
    } else {
      console.log("Reached the end of the video list.");
    }
  };

  const handlePrevious = () => {
    if (currentVideoIndex > 0) {
      setCurrentVideoIndex(currentVideoIndex - 1);
    } else {
      console.log("Already at the first video.");
    }
  };

  return (
    <SafeAreaView className="bg-gray-100 flex-1">
      {videos.length > 0 && (
        <View className="w-11/12 bg-white rounded-2xl p-4 shadow-md self-center mt-4">
          {/* Video Player using expo-av */}
          <Video
            source={{ uri: videos[currentVideoIndex].thumbnail }}
            style={{ width: "100%", height: 200, borderRadius: 12 }}
            resizeMode="contain"
            shouldPlay
            isLooping
          />

          {/* Video Title */}
          <Text className="text-lg font-semibold mt-4 text-gray-800">
            {videos[currentVideoIndex].title}
          </Text>

          {/* Transcript Box */}
          <View className="mt-4 p-4 bg-gray-100 rounded-lg">
            <Text className="text-gray-600">{videos[currentVideoIndex].transcript}</Text>
          </View>
        </View>
      )}

    
      <View className="flex-row justify-between mt-6 px-4">
        <TouchableOpacity
          className="px-4 py-2 bg-blue-500 rounded-full shadow-md"
          onPress={handlePrevious}
        >
          <Text className="text-black-500 font-bold">Previous</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="px-4 py-2 bg-blue-500 rounded-full shadow-md"
          onPress={handleNext}
        >
          <Text className="text-black-500 font-bold">Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Course_result;
