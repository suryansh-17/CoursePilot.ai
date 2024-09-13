import React from "react";
import { Course } from "@/types/course";
import { FaRegClock } from "react-icons/fa";
import { CiCircleCheck } from "react-icons/ci";
import EditChapter from "./EditChapter";
import { useAppSelector } from "@/lib/store/hooks";

const ChapterList: React.FC = () => {
  const course = useAppSelector((state) => state.courseLayout);
  const chapters = course.courseOutput.chapters;
  return (
    <div className="mt-3">
      <h2 className="font-medium text-xl">Chapters</h2>
      <div className="mt-2">
        {chapters.map((chapter, index) => (
          <div
            key={index}
            className="border p-5 rounded-lg my-1 flex items-center justify-between"
          >
            <div className="flex gap-2 items-center">
              <h2 className="bg-primary flex-none h-10 w-10 text-white rounded-full text-center p-2">
                {index + 1}
              </h2>
              <div>
                <h2 className="font-medium text-lg">
                  {chapter.chapter_name}
                  <EditChapter course={course} index={index} />
                </h2>
                <p className="text-sm text-purple-50">{chapter.about}</p>
                <p className="flex gap-2 text-primary items-center">
                  <FaRegClock />
                  {chapter.duration}
                </p>
              </div>
            </div>
            <CiCircleCheck className="text-4xl text-gray-300 flex-none" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChapterList;
