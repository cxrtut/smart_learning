import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';

interface VideoListProps {
    videos: Array<{ id: string; url: string; title: string }>;
    onSelect?: (video: { id: string; url: string; title: string }) => void;
}

const VideoList: React.FC<VideoListProps> = ({ videos, onSelect }) => {
    return (
        <FlatList
            data={videos}
            renderItem={({ item }) => (
                <TouchableOpacity onPress={() => onSelect && onSelect(item)} className="p-2 my-2 bg-gray-100 rounded-lg">
                    <Text className="text-base text-gray-800">{item.title}</Text>
                </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id}
        />
    );
};

export default VideoList;
