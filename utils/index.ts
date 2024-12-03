import { neon } from '@neondatabase/serverless';
import {
    grade10_12Subjects,
    grade1_3Subjects,
    grade4_6Subjects,
    grade7Subjects,
    grade8_9Subjects
} from "@/constants";

// Function to fetch subjects by grade and school level
export const getSubjectsByGradeAndSchool = async (grade: string, school: string) => {
    try {
        const sql = neon(`${process.env.EXPO_PUBLIC_DATABASE_URL as string}`);
        // Ensure the query awaits the asynchronous call
        const subjects = await sql`
            SELECT subject_name, subject_id 
            FROM "Subject" 
            WHERE grade_range = ${grade} 
            AND school_level = ${school};
        ` as {subject_name: string, subject_id: string}[];

        // Return the subjects as a JSON string (if needed)
        return subjects;
    } catch (error) {
        console.error("Error fetching subjects:", error);
        throw error; // Optionally, you can handle the error more gracefully here
    }
    
};

export const getVideoUrl = async (id: string) => {
    try {
        const sql = neon(`${process.env.EXPO_PUBLIC_DATABASE_URL as string}`);
        const response = await sql`
            SELECT 
                s.subject_name, 
                sv.title, 
                sv.video_url, 
                sv.description 
            FROM 
                "Onboarding" o
            JOIN 
                "Subject" s ON s.grade_range = o.grade_range AND s.school_level = o.school_level
            JOIN 
                "SubjectVideos" sv ON sv.subject_id = s.subject_id
            WHERE 
                o.user_id = ${id};
        ` as { subject_name: string; title: string; video_url: string; description: string }[];

        return response;
    } catch (error) {
        console.error("Error fetching video URLs:", error);
        throw new Error("Failed to fetch video data. Please try again later.");
    }
};

export const getVideoTitle= async (id: string) => {
    try {
        const sql = neon(`${process.env.EXPO_PUBLIC_DATABASE_URL as string}`);
        const response = await sql`
            SELECT  
                s.subject_name, 
                sv.title 
            FROM 
                "Onboarding" o
            JOIN 
                "Subject" s ON s.grade_range = o.grade_range AND s.school_level = o.school_level
            JOIN 
                "SubjectVideos" sv ON sv.subject_id = s.subject_id
            WHERE 
                o.user_id = ${id};
        ` as {subject_name: string; title: string; }[];

        return response;
    } catch (error) {
        console.error("Error fetching video URLs:", error);
        throw new Error("Failed to fetch video data. Please try again later.");
    }
};

export const analyzeImage = async (imageUri: string, base64Image: string) => {
    try {
        if(!imageUri) {
            return JSON.stringify({error: "No image provided"});
        }

        const apiKey = process.env.EXPO_PUBLIC_CLOUD_VISION_API_KEY;
        const apiUrl = `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`;

        const requestData = {
            requests: [
                {
                    image: {
                        content: base64Image
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

