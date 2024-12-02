import React from "react";
import { View, Text, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import CustomHeader from "@/components/CustomHeader";
import colors from "@/constants/colors";
import YoutubePlayer from "react-native-youtube-iframe";

const { width: screenWidth } = Dimensions.get("window");

const Course_result = () => {
  const { video } = useLocalSearchParams();
  const videoData = JSON.parse(video as string);
  const url = videoData.video_url.split("v=")[1]?.split("&")[0];
  console.log("Video ID: " + url);

  if (!videoData) {
    return (
      <SafeAreaView style={{ backgroundColor: colors.PRIMARY }} className="bg-gray-100 flex-1">
        <CustomHeader title="Course" showBackButton={true} headerStyles="pr-3" />
        <View className="flex-1 justify-center items-center">
          <Text className="text-gray-800 text-lg">No video selected.</Text>
        </View>
      </SafeAreaView>
    );
  }

  const videoHeight = (screenWidth / 16) * 9; // Maintain 16:9 aspect ratio

  return (
    <SafeAreaView style={{ backgroundColor: colors.PRIMARY }} className="bg-gray-100 flex-1">
      <CustomHeader title="Course" showBackButton={true} headerStyles="pr-3" />
      <View style={{ paddingHorizontal: 16, paddingVertical: 20, flex: 1 }}>
        {/* Video Player */}
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <YoutubePlayer
            height={videoHeight}
            width={screenWidth}
            play={true}
            videoId={url}
          />
        </View>

        {/* Video Title */}
        <Text className="text-lg font-semibold mt-4 text-gray-800">{videoData.title}</Text>

        {/* Transcript/Description */}
        <View className="mt-4 p-4 bg-gray-100 rounded-lg">
          <Text className="text-gray-600">{videoData.description}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Course_result;