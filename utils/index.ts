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
        console.log("Whats Happening")
        // Ensure the query awaits the asynchronous call
        const subjects = await sql`
            SELECT subject_name, subject_id 
            FROM "Subject" 
            WHERE grade_range = ${grade} 
            AND school_level = ${school};
        ` as {subject_name: string, subject_id: string}[];

        console.log(subjects)

        // Return the subjects as a JSON string (if needed)
        return subjects;
    } catch (error) {
        console.error("Error fetching subjects:", error);
        throw error; // Optionally, you can handle the error more gracefully here
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