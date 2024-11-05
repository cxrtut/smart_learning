import React from 'react';
import { View, Text } from 'react-native';

interface TranscriptProps {
    transcript: string;
}

const Transcript: React.FC<TranscriptProps> = ({ transcript }) => {
    return (
        <View className="p-4 bg-gray-100 rounded-lg border border-gray-300">
            <Text className="text-lg font-bold mb-2">Transcript</Text>
            <Text className="text-base">{transcript}</Text>
        </View>
    );
};

export default Transcript;
