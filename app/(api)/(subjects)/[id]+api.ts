import { neon } from "@neondatabase/serverless";

export async function GET(request: Request, { id }: { id: string }) {
    try {
        console.log("Executing the Try atleast")
        if (!id) {
            return new Response(JSON.stringify({ error: "User ID is required" }), { status: 400 });
        }

        if (!process.env.DATABASE_URL) {
            throw new Error("Database URL is not defined");
        }

        const sql = neon(`${process.env.DATABASE_URL}`);
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
        `;

        console.log("SubjectVideo API Response" ,{response})

        return new Response(JSON.stringify({ data: response }), { status: 200 });
    } catch (error: any) {
        console.error("Error from fetch: ", error);
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}
