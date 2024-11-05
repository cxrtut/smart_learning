import { neon } from '@neondatabase/serverless';


export async function POST(request: Request) {
    try {
        const sql = neon(`${process.env.DATABASE_URL}`);

        const { userId, schoolLevel, gradeRange } = await request.json();

        if(!userId || !schoolLevel || !gradeRange) {
            return Response.json(
                { error: 'Missing required fields'}, 
                { status: 400 }
            );
        }

        const response = await sql`
            INSERT INTO "onboarding"(user_id, school_level, grade_range)
            VALUES(${userId}, ${schoolLevel}, ${gradeRange});
        `;

        return new Response(JSON.stringify({data: response}), { status: 200 });
        
    } catch (error) {
        console.log("Error from fetch: ", error);
        return Response.json({error: error}, { status: 500 });
    }
}