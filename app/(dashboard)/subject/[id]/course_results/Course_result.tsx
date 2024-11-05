import React from 'react';
import { View, Text } from 'react-native';
import VideoList from './VideoList';

const mockVideos = [
    { id: '1', url: 'https://example.com/video1', title: 'Intro to React Native' },
    { id: '2', url: 'https://example.com/video2', title: 'Advanced State Management' },
    { id: '3', url: 'https://example.com/video3', title: 'Building a Video List App' },
    { id: '4', url: 'https://example.com/video4', title: 'React Native Animations' },
    { id: '5', url: 'https://example.com/video5', title: 'Optimizing Performance' },
];

const Course_result: React.FC = () => {
    const handleSelect = (video: { id: string; url: string; title: string }) => {
        console.log('Selected video:', video);
    };

    return (
        <View className="flex-1 p-4 bg-white">
            <Text className="text-2xl font-semibold mb-4">Video List</Text>
            <VideoList videos={mockVideos} onSelect={handleSelect} />
        </View>
    );
};

export default Course_result;
