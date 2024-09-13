import { NextResponse } from "next/server";
import {
  addCourse,
  getCourseById,
  updateCourse,
} from "@/services/Db/courseService"; // Adjust the import path based on your project structure

export async function POST(request: Request) {
  try {
    // Extract course data from the request body
    const courseData = await request.json();
    console.log("Course data:", courseData);
    // Call your service function to add the course
    const newCourse = await addCourse(courseData);

    // Return the response with the newly created course
    return NextResponse.json(newCourse, { status: 201 });
  } catch (error) {
    console.error("Error adding course:", error);
    return NextResponse.json(
      { error: `Failed to add course: ${(error as Error).message || error}` },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    // Extract the courseId and userId from query parameters
    const { searchParams } = new URL(request.url);
    const courseId = searchParams.get("courseId");
    const userId = searchParams.get("userId");

    if (!courseId) {
      return NextResponse.json(
        { error: "Course ID is required" },
        { status: 400 }
      );
    }

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    // Fetch the course data by courseId and validate ownership using userId if needed
    const course = await getCourseById(courseId, userId);
    console.log("Course data:", course);
    // Optionally validate that the course belongs to the user (if needed)
    if (course && course.userId !== userId) {
      return NextResponse.json(
        { error: "Access denied: This course does not belong to the user." },
        { status: 403 }
      );
    }

    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    // Return the response with the course data
    return NextResponse.json(course, { status: 200 });
  } catch (error) {
    console.error("Error fetching course:", error);
    return NextResponse.json(
      { error: `Failed to fetch course: ${(error as Error).message || error}` },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    // Extract the courseId from the request body
    const { courseId, ...courseData } = await request.json();
    console.log("Course ID:", courseId);
    console.log("Course data:", courseData);

    if (!courseId) {
      return NextResponse.json(
        { error: "Course ID is required" },
        { status: 400 }
      );
    }

    // Call your service function to update the course
    const updatedCourse = await updateCourse(courseId, courseData);

    // Return the response with the updated course
    return NextResponse.json(updatedCourse, { status: 200 });
  } catch (error) {
    console.error("Error updating course:", error);
    return NextResponse.json(
      {
        error: `Failed to update course: ${(error as Error).message || error}`,
      },
      { status: 500 }
    );
  }
}
