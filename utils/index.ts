import { supabase } from "@/lib/supabase";
import * as FileSystem from 'expo-file-system';

export const getSubjectsByGradeAndSchool = async (grade: string, school: string) => {
    try {
        const {data, error} = await supabase.from('Subject')
        .select('subject_name, subject_id')
        .eq('grade_range', grade)
        .eq('school_level', school);

        if (error) {
            console.error(error)
            throw error;
        }

        return data;
    } catch (error) {
        console.log("Error fetching subjects:", error);
        throw new Error("Failed to fetch subjects. Please try again later.");
    }
};

export const getSubjectVideosBySubjectId = async (subjectId: string) => {
    try {
        const {data, error} = await supabase.from('SubjectVideos')
        .select('title, description, video_url')
        .eq('subject_id', subjectId);

        if (error) {
            console.error(error)
            throw error;
        }

        return data;
    } catch (error) {
        console.log("Error fetching videos:", error);
        throw new Error("Failed to fetch videos. Please try again later.");
    }
}

export const analyzeImage = async (imageUri: string) => {
    try {
        if(!imageUri) {
            return JSON.stringify({error: "No image provided"});
        }

        const fileContent = await FileSystem.readAsStringAsync(imageUri, { 
            encoding: FileSystem.EncodingType.Base64 
        });

        const apiKey = process.env.EXPO_PUBLIC_CLOUD_VISION_API_KEY;
        const apiUrl = `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`;

        const requestData = {
            requests: [
                {
                    image: {
                        content: fileContent
                    },
                    features: [
                        {
                            type: 'TEXT_DETECTION',
                            maxResults: 5
                        }
                    ]
                }
            ]
        }

        const apiResponse = await fetch(apiUrl, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(requestData)
        })

        const data = await apiResponse.json();
        return data;

    } catch (error) {
        console.error('Error analyzing image: ',error);
        return JSON.stringify({error: "Error analyzing image"});
    }
}

export const extractYouTubeVideoId = (url: string): string | null => {
    const videoIdRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(videoIdRegex);
    return match ? match[1] : null;
}

export const fetchYouTubeThumbnail = async (videoId: string | null) => {
    if (!videoId) return null;

    try {
        const response = await fetch(
            `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${process.env.EXPO_PUBLIC_YOUTUBE_API_KEY}`
        );
        const data = await response.json();

        if (data.items && data.items.length > 0) {
            const thumbnails = data.items[0].snippet.thumbnails;

            // Return the highest quality available
            return thumbnails.high?.url;
        }
    } catch (error) {
        console.error("Error fetching YouTube thumbnail:", error);
    }

    return null;
};
