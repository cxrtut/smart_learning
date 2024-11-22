import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "@/constants/colors";
import CustomHeader from "@/components/CustomHeader";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useOnboarding } from "@/context/onboardingContext";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Picker } from "@react-native-picker/picker";
import { fetchAPI } from "@/lib/fetch";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { getVideoUrl } from "@/utils";
import { debounce } from "lodash";

const Course = () => {
  const { user } = useUser();
  const { activeSubject } = useOnboarding();
  const router = useRouter();
  const searchInputRef = useRef<TextInput>(null);

  // State to manage the selected option and fetched videos
  const [selectedOption, setSelectedOption] = useState("");
  const [videos, setVideos] = useState<
    { title: string; video_url: string; description: string }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [fetchError, setFetchError] = useState<string | null>(null);

  // Fetch videos based on the user's ID
  useEffect(() => {
    const loadVideoUrls = async () => {
      if (!user?.id) return;
      setLoading(true);
      setFetchError(null); // Reset error state before each fetch
      try {
        const data = await getVideoUrl(user?.id);

        // Filter videos based on the active subject
        const subjectVideos = data.filter((video) => video.subject_name === activeSubject?.subjectName);

        if (subjectVideos.length > 0) {
          setVideos(subjectVideos);
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

  // Debounced search function
  const handleSearchChange = debounce((query: string) => {
    setSearchQuery(query);
  }, 500);

  // Filter videos based on the search query
  const filteredVideos = videos.filter((video) =>
    video.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={{ backgroundColor: colors.PRIMARY }} className="flex h-full w-full">
      <CustomHeader
        title="Smart Learning"
        subtitle={activeSubject?.subjectName}
        showBackButton={true}
        headerStyles="pr-3"
      />

      {/* Search Bar with Icon Button */}
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
          onPress={() => searchInputRef.current?.focus()}
          className="ml-2 bg-white p-3 rounded-lg"
        >
          <FontAwesome name="search" size={28} color="black" />
        </TouchableOpacity>
      </View>

      {/* Combo Box (Picker) with Label */}
      <View className="p-8">
        <Text className="text-white text-lg font-bold mb-2">Select Topic</Text>
        <View className="bg-white border border-gray-300 rounded-lg mb-10">
          {loading ? (
            <Text className="text-center p-4 text-white">Loading Videos...</Text>
          ) : fetchError ? (
            <Text className="text-center p-4 text-white">{fetchError}</Text>
          ) : (
            <>
              {filteredVideos.length === 0 ? (
                <Text className="text-center p-4 text-white">No videos found</Text>
              ) : (
                <Picker
                  selectedValue={selectedOption}
                  onValueChange={handleOptionSelect}
                  style={{ height: 50, color: "black" }}
                >
                  <Picker.Item label="" value="" />
                  {filteredVideos.map((video, index) => (
                    <Picker.Item key={index} label={video.title} value={video.title} />
                  ))}
                </Picker>
              )}
            </>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Course;
