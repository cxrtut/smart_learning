import { neon } from "@neondatabase/serverless";
import { getClerkInstance } from "@clerk/clerk-expo"; // Assuming you are using Clerk for authentication

export async function GET(request: Request, { id }: { id: string }) {
  try {
    // Initialize the database connection
    const sql = neon(`${process.env.DATABASE_URL!}`);
    
    // Step 1: Fetch the grade_range and school_level from the Onboarding table based on the user's ID
    const onboardingResponse = await sql`
      SELECT grade_range, school_level FROM "Onboarding" WHERE user_id = ${id};
    `;
    
    if (onboardingResponse.length === 0) {
      return Response.json({ error: "Onboarding information not found" }, { status: 404 });
    }

    const { grade_range, school_level } = onboardingResponse[0];

    // Step 2: Use the grade_range from the Onboarding table to fetch relevant subjects
    const subjectResponse = await sql`
      SELECT subject_name, grade FROM "Subject" WHERE grade = ${grade_range};
    `;

    // Step 3: Return the data
    return Response.json({ data: subjectResponse });
    
  } catch (error) {
    console.log("Error from fetch: ", error);
    return Response.json({ error: error instanceof Error ? error.message : "Internal Server Error" }, { status: 500 });
  }
}




