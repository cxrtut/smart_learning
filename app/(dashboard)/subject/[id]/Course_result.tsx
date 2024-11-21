import React, { useState } from "react";
import { View, Text, ScrollView, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Video } from "expo-av";
import CustomHeader from "@/components/CustomHeader";
import colors from "@/constants/colors";

const { width: screenWidth } = Dimensions.get("window");

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

  return (
    <SafeAreaView style={{ backgroundColor: colors.PRIMARY }} className="bg-gray-100 flex-1">
      <CustomHeader title="Course"
       showBackButton={true} 
       headerStyles="pr-3" />

      {/* Horizontal Scrollable Video List */}
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={{ flex: 1 }}
      >
        {videos.map((video, index) => (
          <View
            key={index}
            style={{
              width: screenWidth,
              paddingHorizontal: 16,
              paddingVertical: 20,
            }}
          >
            {/* Video Player */}
            <Video
              source={{ uri: video.thumbnail }}
              style={{
                width: "100%",
                height: 500,
                borderRadius: 12,
                backgroundColor: "#000",
              }}
              resizeMode="contain"
              shouldPlay={index === 0} // Only play the first video initially
              isLooping
            />

            {/* Video Title */}
            <Text className="text-lg font-semibold mt-4 text-gray-800">
              {video.title}
            </Text>

            {/* Transcript Box */}
            <View className="mt-4 p-4 bg-gray-100 rounded-lg">
              <Text className="text-gray-600">{video.transcript}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Course_result;
