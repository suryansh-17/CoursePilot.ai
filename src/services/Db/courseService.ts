import { db } from "@/config/Database";
import { CourseList } from "@/models/Schema";
import { eq, and } from "drizzle-orm";

export async function addCourse(courseData: {
  courseId: string;
  name: string;
  category: string;
  level: string;
  courseOutput: any;
  createdBy: string;
  userName?: string;
  userProfileImage?: string;
}) {
  try {
    const result = await db.insert(CourseList).values(courseData);
    console.log(result);
    return result;
  } catch (error) {
    console.error("Failed to insert course:", error);
    throw new Error("Failed to add course to the database");
  }
}

export async function getCourseById(courseId: string, userId: string) {
  console.log("Fetching course by ID:", courseId);
  console.log("User ID:", userId);
  try {
    // Fetch course data by courseId and userId
    const course = await db
      .select()
      .from(CourseList)
      .where(
        and(eq(CourseList.courseId, courseId), eq(CourseList.userId, userId))
      )
      .limit(1);

    console.log("Course data:", course);
    return course.length > 0 ? course[0] : null;
  } catch (error) {
    console.error("Failed to fetch course:", error);
    throw new Error("Failed to fetch course from the database");
  }
}

export async function updateCourse(courseId: string, courseData: any) {
  try {
    const result = await db
      .update(CourseList)
      .set(courseData)
      .where(eq(CourseList.courseId, courseId));
    console.log(result);
    return result;
  } catch (error) {
    console.error("Failed to update course:", error);
    throw new Error("Failed to update course in the database");
  }
}
