// Define the types for the chapters inside courseOutput
export interface Chapter {
  chapter_name: string; // Name of the chapter
  about: string; // Description of the chapter
  duration: string; // Duration of the chapter (e.g., "1 hour")
}

// Define the structure for the courseOutput
export interface CourseOutput {
  course_name: string; // Name of the course
  description: string; // Detailed description of the course
  chapters: Chapter[]; // Array of chapters
  category: string; // Category of the course (e.g., "Programming")
  topic: string; // Specific topic covered (e.g., "Python")
  level: string; // Level of the course (e.g., "Advance")
  duration: string; // Total duration of the course (e.g., "2 hours")
  no_of_chapters: number; // Number of chapters in the course
}

// Main Course interface with the nested types
export interface Course {
  id: number; // Serial primary key
  courseId: string; // Unique identifier for the course
  name: string; // Name of the course
  category: string; // Category of the course
  level: string; // Level of the course (e.g., Beginner, Intermediate, Advanced)
  includeVideo: string; // Indicates if the course includes video, default is "Yes"
  courseOutput: CourseOutput; // Detailed output of the course with structured data
  createdBy: string; // ID or identifier of the creator
  userName?: string; // Optional username of the creator
  userId?: string; // Optional user ID of the creator
  userProfileImage?: string; // Optional profile image URL of the creator
}
