import { addChapter } from "@/services/Db/courseService"; // Import the addChapter function

// Define the POST request handler
export async function POST(request: Request) {
  try {
    const { chapters } = await request.json(); // Parse the request body

    // Iterate over each chapter and add it to the database
    const results = await Promise.all(chapters.map(addChapter));

    return new Response(JSON.stringify(results), { status: 201 }); // Return the result with a 201 status code
  } catch (error) {
    if (error instanceof Error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
      }); // Handle errors
    } else {
      return new Response(
        JSON.stringify({ error: "An unknown error occurred" }),
        {
          status: 500,
        }
      ); // Handle unknown errors
    }
  }
}
