import { neon } from '@neondatabase/serverless';
import {v4 as uuidv4} from 'uuid';


export async function POST(request: Request) {
    try {
        let user_id = uuidv4();
        const sql = neon(`${process.env.DATABASE_URL}`);
        const { name, email, clerkId } = await request.json();

        if(!name || !email || !clerkId) {
            return Response.json(
                { error: 'Missing required fields'}, 
                { status: 400 }
            );
        }

        const response = await sql`
            INSERT INTO "User"(user_id, clerk_id, email, username)
            VALUES(${user_id}, ${clerkId}, ${email}, ${name});
        `;

        return new Response(JSON.stringify({data: response}), { status: 200 });
        
    } catch (error) {
        console.log("Error from fetch: ", error);
        return Response.json({error: error}, { status: 500 });
    }
}

// See https://neon.tech/docs/serverless/serverless-driver
// for more information