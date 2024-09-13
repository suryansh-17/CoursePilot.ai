import React from "react";
import { useAppSelector } from "@/lib/store/hooks";
import { RootState } from "@/lib/store/store"; // Adjust the path based on your project structure
import Image from "next/image";
import { Button } from "../ui/button";
import EditCourseInfo from "./EditCourseInfo";

// Define the prop types for the component
const CourseBasicInfo: React.FC = () => {
  // Use useSelector to get course data from Redux
  const course = useAppSelector((state: RootState) => state.courseLayout);

  return (
    <div className="p-10 border rounded-xl shadow-sm mt-10">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="px-5">
          <h2 className="font-bold text-2xl ">
            {course?.courseOutput?.course_name}

            <EditCourseInfo course={course} />
          </h2>
          <p className="text-sm text-gray-50 mt-3">
            {course?.courseOutput?.description}
          </p>
          <div className="border inline-block rounded-full bg-gray-400 text-black font-bold py-1 px-2 mt-1">
            {course?.category}
          </div>
          <Button className="w-full mt-10">Start</Button>
        </div>

        <div>
          <Image
            src={"/placeholder-image.jpg"}
            width={300}
            height={300}
            className="w-full rounded-xl h-[250px] object-cover"
            alt="Course Image"
          />
        </div>
      </div>
    </div>
  );
};

export default CourseBasicInfo;
