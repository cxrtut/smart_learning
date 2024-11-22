import React from "react";
import { View, Text, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Video } from "expo-av";
import { useLocalSearchParams } from "expo-router";
import CustomHeader from "@/components/CustomHeader";
import colors from "@/constants/colors";

const { width: screenWidth } = Dimensions.get("window");

const Course_result = () => {
  const { video } = useLocalSearchParams();
  const videoData = JSON.parse(video as string);

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

  return (
    <SafeAreaView style={{ backgroundColor: colors.PRIMARY }} className="bg-gray-100 flex-1">
      <CustomHeader title="Course" showBackButton={true} headerStyles="pr-3" />
      <View style={{ paddingHorizontal: 16, paddingVertical: 20 }}>
        {/* Video Player */}
        <Video
          source={{ uri: videoData.video_url }}
          style={{
            width: "100%",
            height: 500,
            borderRadius: 12,
            backgroundColor: "#000",
          }}
          resizeMode="contain"
          shouldPlay
          isLooping
        />

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
