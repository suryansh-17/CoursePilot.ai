"use client";

import { useUser } from "@clerk/nextjs";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { Course } from "@/types/course";
import CourseBasicInfo from "@/components/CourseLayout/CourseBasicInfo";
import CourseDetail from "@/components/CourseLayout/CourseDetail";
import ChapterList from "@/components/CourseLayout/ChapterList";
import { setCourseData } from "@/lib/store/features/courseLayoutSlice";
import { Button } from "@/components/ui/button"; // Import the Button component
import getYoutubeVideo from "@/config/YouTube"; // Import the YouTube API function

const CourseLayout = () => {
  const { courseId } = useParams();
  const { user } = useUser();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const course = useAppSelector((state) => state.courseLayout); // Get course data from Redux

  // Set proper types for state: course is initially null until data is fetched
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

  const generateCourseContent = async () => {
    const chapters = course?.courseOutput?.chapters;
    const newChapterData: any[] = [];

    try {
      await Promise.all(
        chapters.map(async (chapter, index) => {
          const PROMPT = `Explain the concept in Detail on Topic: ${course?.courseOutput?.course_name}, Chapter: ${chapter.chapter_name}, in JSON Format with list of array with field as title, explanation on give chapter in detail, Code Example(Code field in <precode> format) if applicable`;
          console.log(PROMPT);

          try {
            // const result = await generateCourseContentAI.sendMessage(PROMPT);
            // console.log(result.response.text());
            //youtube api
            const youtubeVideo = await getYoutubeVideo(
              `${course?.courseOutput?.course_name} ${chapter.chapter_name}`
            );
            console.log(youtubeVideo);

            // Ensure youtubeVideo is an array and has at least one item
            const videoId =
              youtubeVideo?.[0]?.id?.videoId || youtubeVideo[0].id.playlistId;
            console.log(videoId);
            // Collect chapter data
            newChapterData.push({
              courseId,
              chapterId: index, // Use index as chapterId
              content: {
                title: chapter.chapter_name,
                // Add other content fields from the AI response if needed
              },
              videoId, // Use the extracted videoId
            });
          } catch (error) {
            console.log(error);
          }
        })
      );

      console.log(newChapterData);
      const response = await fetch("/api/chapters", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ chapters: newChapterData }),
      });

      if (!response.ok) {
        throw new Error("Failed to save chapters");
      }

      // Redirect to the finish page using navigate
      // router.push("/finish");
    } catch (error) {
      console.log(error);
    }
  };

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

      {/* Add the Generate Course Content button */}
      <Button className="w-full mt-10" onClick={generateCourseContent}>
        Generate Course Content
      </Button>
    </div>
  );
};

export default CourseLayout;
