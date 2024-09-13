"use client";

import { useUser } from "@clerk/nextjs";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useAppDispatch } from "@/lib/store/hooks";
import { Course } from "@/types/course";
import CourseBasicInfo from "@/components/CourseLayout/CourseBasicInfo";
import CourseDetail from "@/components/CourseLayout/CourseDetail";
import ChapterList from "@/components/CourseLayout/ChapterList";
import { setCourseData } from "@/lib/store/features/courseLayoutSlice";

const CourseLayout = () => {
  const { courseId } = useParams();
  const { user } = useUser();
  const dispatch = useAppDispatch();

  // Set proper types for state: course is initially null until data is fetched
  const [course, setCourse] = useState<Course | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        // Ensure courseId and user are available
        if (!courseId || !user?.id) return;

        const response = await fetch(
          `/api/courses?courseId=${courseId}&userId=${user.id}`
        );

        if (!response.ok) {
          const errorData = await response.json();
          setError(errorData.error || "Failed to fetch course");
          return;
        }

        const courseData: Course = await response.json();
        setCourse(courseData); // Set the fetched course data
        dispatch(setCourseData(courseData)); // Dispatch to set course data in Redux
        console.log("Course data:", courseData);
      } catch (error) {
        setError(
          `Failed to fetch course: ${
            error instanceof Error ? error.message : String(error)
          }`
        );
      }
    };

    fetchCourse();
  }, [courseId, user?.id, dispatch]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mt-10 px-7 md:px-20 lg:px-44">
      <div className="font-bold text-center text-2xl">Course Layout</div>
      {/* Basic info  */}
      <CourseBasicInfo />

      {/* course detail   */}
      <CourseDetail course={course} />
      {/* list of Chapters  */}
      <ChapterList />
    </div>
  );
};

export default CourseLayout;
