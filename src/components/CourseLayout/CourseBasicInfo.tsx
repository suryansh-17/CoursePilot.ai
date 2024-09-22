import React, { useState } from "react";
import { useAppSelector } from "@/lib/store/hooks";
import { RootState } from "@/lib/store/store"; // Adjust the path based on your project structure
import Image from "next/image";
import { Button } from "../ui/button";
import EditCourseInfo from "./EditCourseInfo";
import s3 from "@/config/AWS"; // Import the configured S3 instance
import {
  generateCourseContentAI,
  generateCourseLayoutAI,
} from "@/config/AiModel";
import getYoutubeVideo from "@/config/YouTube";

// Define the prop types for the component
const CourseBasicInfo: React.FC = () => {
  // Use useSelector to get course data from Redux
  const course = useAppSelector((state: RootState) => state.courseLayout);
  const [image, setImage] = useState<File | null>(null);

  const uploadImageToS3 = async (file: File) => {
    console.log("Starting uploadImageToS3 function");
    console.log("bucket name:", process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME);
    console.log(
      "aws access key id:",
      process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID
    );
    if (!course?.id) {
      console.error("Course ID is missing");
      return;
    }

    const params = {
      Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME,
      Key: `course-images/${course.id}/thumbnail`, // File path in the bucket with course ID
      Body: file,
      ContentType: file.type,
    };
    console.log("S3 upload params:", params);
    try {
      const data = await s3.upload(params as AWS.S3.PutObjectRequest).promise();
      console.log("File uploaded successfully", data);
      return data.Key; // Return the S3 key
    } catch (err) {
      console.error("Error uploading file", err);
      return null;
    }
  };

  const handlePublish = async () => {
    if (!course?.id) {
      console.error("Course ID is missing");
      return;
    }

    let thumbnailS3Key = null;
    if (image) {
      thumbnailS3Key = await uploadImageToS3(image);
    }

    const response = await fetch("/api/courses", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...course,
        published: true,
        thumbnailS3Key,
      }),
    });

    if (response.ok) {
      console.log("Course published successfully");
    } else {
      console.error("Failed to publish course");
    }
  };

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
          <Button className="w-full mt-10" onClick={handlePublish}>
            Publish
          </Button>
        </div>

        <div>
          <label htmlFor="course-image">
            <Image
              src={
                image ? URL.createObjectURL(image) : "/placeholder-image.jpg"
              }
              width={300}
              height={300}
              className="w-full rounded-xl h-[250px] object-cover cursor-pointer"
              alt="Course Image"
            />
          </label>
          <input
            type="file"
            id="course-image"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                console.log("Selected file:", file);
                setImage(file);
                uploadImageToS3(file); // Upload the image to S3
              } else {
                console.log("No file selected");
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CourseBasicInfo;
