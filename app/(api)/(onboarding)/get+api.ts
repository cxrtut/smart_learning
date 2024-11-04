import { neon } from "@neondatabase/serverless";
import {getClerkInstance} from "@clerk/clerk-expo";

export async function GET() {
    try {
        console.log("Running onboarding GET");
        const sql = neon(`${process.env.DATABASE_URL!}`);

        console.log("Run sql query");
        const response = await sql`
            SELECT school_level, grade_range FROM "onboarding";
        `;

        return Response.json({data: response});
        
    } catch (error) {
        console.log("Error from fetch: ", error);
        return Response.json({error: error}, { status: 500 });
    }
}