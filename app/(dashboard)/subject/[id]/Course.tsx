import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import React, { useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import colors from '@/constants/colors';
import CustomHeader from '@/components/CustomHeader';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useOnboarding } from '@/context/onboardingContext';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Picker } from '@react-native-picker/picker';

const Course = () => {
    const { id } = useLocalSearchParams<{ id: string }>();
    const { activeSubject } = useOnboarding();
    const searchInputRef = useRef<TextInput>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedOption, setSelectedOption] = useState("");
    const router = useRouter();

    const handleSearch = () => {
        if (searchQuery.trim()) {
            router.push(`/(dashboard)/subject/${id}/Course_result`);
        }
    };

    const handleOptionSelect = (itemValue: string) => {
        setSelectedOption(itemValue);
        if (itemValue) {

            router.push(`/(dashboard)/subject/${id}/Course_result`);
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

            {/* Search Bar with Icon Button */}
            <View className="flex-row items-center p-8">
                <TextInput
                    ref={searchInputRef}
                    placeholder="Search"
                    placeholderTextColor="gray"
                    className="bg-white p-3 border border-gray-300 text-black flex-1 rounded-lg"
                    style={{ borderRadius: 12 }}
                    value={searchQuery}
                    onChangeText={(text) => setSearchQuery(text)}
                />
                <TouchableOpacity
                    onPress={handleSearch}
                    className="ml-2 bg-white p-3 rounded-lg"
                >
                    <FontAwesome name="search" size={28} color="black" />
                </TouchableOpacity>
            </View>

            {/* Combo Box (Picker) with Label */}
            <View className="p-8">
                <Text className="text-white text-lg font-bold mb-2">Select Topic</Text>
                <View className="bg-white border border-gray-300 rounded-lg mb-10">
                    <Picker
                        selectedValue={selectedOption}
                        onValueChange={handleOptionSelect}
                        style={{ height: 50, color: 'black' }}
                    >
                        <Picker.Item label="Select Topic" value="" />
                        <Picker.Item label="Option 1" value="Option1" />
                        <Picker.Item label="Option 2" value="Option2" />
                        <Picker.Item label="Option 3" value="Option3" />
                        <Picker.Item label="Option 4" value="Option4" />
                    </Picker>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default Course;
