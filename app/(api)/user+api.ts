import { neon } from '@neondatabase/serverless';


export async function POST(request: Request) {
    try {
        console.log("Running POST request to inject user data");
        const sql = neon(`${process.env.DATABASE_URL}`);
        const { name, email, clerkId } = await request.json();

        if(!name || !email || !clerkId) {
            return Response.json(
                { error: 'Missing required fields'}, 
                { status: 400 }
            );
        }

        const response = await sql`
            INSERT INTO User (clerk_id, email, username)
            VALUES (${clerkId}, ${email}, ${name}, )
        `;

        return new Response(JSON.stringify({data: response}), { status: 200 });
        
    } catch (error) {
        console.log(error);
        return Response.json({error: error}, { status: 500 });
    }
}

// See https://neon.tech/docs/serverless/serverless-driver
// for more information