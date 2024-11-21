import { neon } from "@neondatabase/serverless";
import { getClerkInstance } from "@clerk/clerk-expo";

export async function GET(request: Request, { id }: { id: string }) {
    try {
        const sql = neon(`${process.env.DATABASE_URL!}`);
        
        // Corrected query with proper join syntax
        const response = await sql`
            SELECT 
                sv.subject_id, 
                sv.title, 
                sv.video_url, 
                sv.description 
            FROM 
                "SubjectVideos" sv
            INNER JOIN 
                "Subject" s 
            ON 
                sv.subject_id = s.subject_id
            WHERE 
                sv.subject_id = ${id};
        `;

        // Return the fetched data
        return new Response(JSON.stringify({ data: response }), { 
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.log("Error from fetch: ", error);
        return new Response(JSON.stringify({ error: String(error) }), { 
            status: 500, 
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
