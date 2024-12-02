import React, { useEffect, useRef, useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Picker } from "@react-native-picker/picker";
import { debounce } from "lodash";
import CustomHeader from "@/components/CustomHeader";
import colors from "@/constants/colors";
import { useOnboarding } from "@/context/onboardingContext";
import { getVideoUrl } from "@/utils";
import { useUser } from '@clerk/clerk-expo';

const Course = () => {

  const {user} = useUser();
  const router = useRouter();
  const { activeSubject } = useOnboarding();
  const searchInputRef = useRef<TextInput>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [videos, setVideos] = useState<
    { title: string; video_url: string; description: string }[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [videoId, setVideoId] = useState("");
  const[ databasevideo ,setDatabasevideo] = useState<{title: string; video_url: string; description: string }[]>([]);
  const YOUTUBE_API_KEY = process.env.EXPO_PUBLIC_YOUTUBE_API_KEY as string;

  // Function to fetch videos based on search query
  const fetchYouTubeVideo = async (query: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&key=${YOUTUBE_API_KEY}`
      );
      const data = await response.json();

      if (data.items && data.items.length > 0) {
        const firstVideo = data.items[0];
        const videoData = {
          title: firstVideo.snippet.title,
          video_url: `https://www.youtube.com/watch?v=${firstVideo.id.videoId}`,
          description: firstVideo.snippet.description,
        };
        setVideoId(firstVideo.id.videoId);

        // Navigate to the Course_result page with video data
        router.push({
          pathname: "/(dashboard)/subject/[id]/Course_result",
          params: { video: JSON.stringify(videoData) },
        });
      } else {
        Alert.alert("No videos found", "Try another search query.");
      }
    } catch (err) {
      console.error("Error fetching video:", err);
      Alert.alert("Error", "Failed to fetch video data.");
    } finally {
      setLoading(false);
    }
  };

  //Getting the video from the database
  useEffect(() => {
    const loadVideoUrls = async () => {
      if (!user?.id) return;
      setLoading(true);
      setFetchError(null);

      try {
        
        const data = await getVideoUrl(user?.id);

        const subjectVideos = data.filter(
          (databasevideo) => databasevideo.subject_name === activeSubject?.subjectName
        );

        if (subjectVideos.length > 0) {
          setVideos(
            subjectVideos.map((databasevideo) => ({
              ...databasevideo,
            }))
          );
          console.log("Database videos fetched:", subjectVideos);
        } else {
          setFetchError("No videos available for this subject.");
        }
      } catch (error) {
        console.error("Error loading videos", error);
        setFetchError("Failed to load video data.");
      } finally {
        setLoading(false);
      }
    };

    loadVideoUrls();
  }, [user?.id, activeSubject?.subjectName]);


  // Debounced search function
  const handleSearchChange = debounce((query: string) => {
    setSearchQuery(query);
  }, 500);

  // Handle search button press
  const handleSearchPress = () => {
    if (searchQuery.trim()) {
      fetchYouTubeVideo(searchQuery);
    } else {
      Alert.alert("Empty Search", "Please enter a query to search.");
    }
  };

  // Handle option select
  const handleOptionSelect = (itemValue: string) => {

    setSelectedOption(itemValue);
    if (itemValue) {
      const selectedVideo = videos.find((v) => v.title === itemValue);

      if (selectedVideo) {
        router.push({
          pathname: "/(dashboard)/subject/[id]/Course_result",
          params: { video: JSON.stringify(selectedVideo) },
        });
      }
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: colors.PRIMARY }} className="flex h-full w-full">
      <CustomHeader
        title="Smart Learning"
        subtitle={activeSubject?.subjectName}
        showBackButton={true}
        headerStyles="pr-3"
      />

      {/* Search Bar , should search from the youtube Api*/}
      <View className="flex-row items-center p-8">
        <TextInput
          ref={searchInputRef}
          placeholder="Search"
          placeholderTextColor="gray"
          className="bg-white p-3 border border-gray-300 text-black flex-1 rounded-lg"
          style={{ borderRadius: 12 }}
          onChangeText={handleSearchChange}
        />
        <TouchableOpacity
          onPress={handleSearchPress}
          className="ml-2 bg-white p-3 rounded-lg"
        >
          <FontAwesome name="search" size={28} color="black" />
        </TouchableOpacity>
      </View>

      {/* Combo Box (Picker) */}

{/* The Combo Box(Picker) should show the video from the Database*/}
      <View className="p-8">
        <Text className="text-white text-lg font-bold mb-2">Select Topic</Text>
        <View className="bg-white border border-gray-300 rounded-lg mb-10">
          {loading ? (
            <ActivityIndicator size="large" color={colors.SECONDARY} />
          ) : fetchError ? (
            <Text className="text-center p-4 text-red-500">{fetchError}</Text>
          ) : (
            <Picker
              selectedValue={selectedOption}
              onValueChange={handleOptionSelect}
              style={{ height: 50, color: "black" }}
            >
              <Picker.Item label="Select an option" value="" />
              {videos.map((databasevideo, index) => (
                <Picker.Item key={index} label={databasevideo.title} value={databasevideo.title} />
              ))}
            </Picker>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Course;
