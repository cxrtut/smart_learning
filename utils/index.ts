import { neon } from '@neondatabase/serverless';

import { 
    grade10_12Subjects, 
    grade1_3Subjects, 
    grade4_6Subjects, 
    grade7Subjects, 
    grade8_9Subjects 
} from "@/constants";


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























// if(school === '1') {
    //     switch(grade) {
    //         case '1':
    //             return grade1_3Subjects;
    //             break;
    //         case '2': 
    //             return grade4_6Subjects;
    //             break;
    //         case '3':
    //             return grade7Subjects;
    //             break;
    //     }
    // } else {
    //     // Secondary school subjects
    //     switch(grade) {
    //         case '1':
    //             return grade8_9Subjects;
    //             break;
    //         case '2':
    //             return grade10_12Subjects;
    //             break;
    //     }
    // }