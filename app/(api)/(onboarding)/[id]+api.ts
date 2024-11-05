import { neon } from "@neondatabase/serverless";
import {getClerkInstance} from "@clerk/clerk-expo";

export async function GET(reqest: Request, {id}: {id: string}) {
    try {
        const sql = neon(`${process.env.DATABASE_URL!}`);
        const response = await sql`
            SELECT school_level, grade_range FROM "onboarding" WHERE user_id = ${id};
        `;

        return Response.json({data: response});
        
    } catch (error) {
        console.log("Error from fetch: ", error);
        return Response.json({error: error}, { status: 500 });
    }
}