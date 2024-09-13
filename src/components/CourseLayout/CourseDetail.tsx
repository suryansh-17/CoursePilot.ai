import React from "react";
import { Course } from "@/types/course";
import { HiOutlineChartBar } from "react-icons/hi";
import { FaRegClock } from "react-icons/fa6";
import { IoMdBook } from "react-icons/io";
import { IoVideocamOutline } from "react-icons/io5";
import InfoCard from "./InfoCard";

interface CourseBasicInfoProps {
  course: Course;
}
const CourseDetail: React.FC<CourseBasicInfoProps> = ({ course }) => {
  return (
    <div className="border p-6 rounded-xl shadow-sm mt-3">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 items-center ">
        <InfoCard
          icon={<HiOutlineChartBar />}
          heading="Skill Level"
          text={course.level}
        />
        <InfoCard
          icon={<FaRegClock />}
          heading="Duration"
          text={`${course.courseOutput.duration} hours`}
        />
        <InfoCard
          icon={<IoMdBook />}
          heading="No. of Chanpters"
          text={`${course.courseOutput.chapters.length}`}
        />
        <InfoCard
          icon={<IoVideocamOutline />}
          heading="Video Included"
          text={`${course.includeVideo ? "Yes" : "No"}`}
        />
      </div>
    </div>
  );
};

export default CourseDetail;
