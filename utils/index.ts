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
        const subjects = await sql`
            SELECT subject_name, subject_id 
            FROM "Subject" 
            WHERE grade_range = ${grade} 
            AND school_level = ${school};
        ` as { subject_name: string; subject_id: string }[];

        return subjects;
    } catch (error) {
        console.error("Error fetching subjects:", error);
        throw new Error("Failed to fetch subjects. Please try again later.");
    }
};

// Function to fetch video URLs and related details by user ID
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

