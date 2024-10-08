"use client";
import React, { useState } from "react";
import { BiCategoryAlt } from "react-icons/bi";
import { MdOutlineTopic } from "react-icons/md";
import { IoMdOptions } from "react-icons/io";
import { Button } from "@/components/ui/button";
import SelectCategory from "@/components/CreateCourse/SelectCategory";
import TopicDescription from "@/components/CreateCourse/TopicDescription";
import SelectOption from "@/components/CreateCourse/SelectOption";
import { useAppSelector } from "@/lib/store/hooks";
import { generateCourseLayoutAI } from "@/config/AiModel";
import LoadingModal from "@/components/LoadingModal";
import uuid4 from "uuid4";
import { User } from "@clerk/nextjs/server";
import { useUser } from "@clerk/nextjs";
import { cp } from "fs";
import { useRouter } from "next/navigation";

const Page: React.FC = () => {
  const user = useUser().user;
  const router = useRouter();
  const StepperOptions = [
    {
      id: 1,
      name: "Category",
      icon: <BiCategoryAlt />,
    },
    {
      id: 2,
      name: "Topic & Desc",
      icon: <MdOutlineTopic />,
    },
    {
      id: 3,
      name: "Options",
      icon: <IoMdOptions />,
    },
  ];
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const userCourseInput = useAppSelector((state) => state.userCourseInput);
  const { category, topic, description, options } = userCourseInput;

  const isCategoryValid = () => category !== "";
  const isTopicDescriptionValid = () => topic !== "" && description !== "";
  const isOptionsValid = () =>
    options.difficultyLevel !== "" &&
    options.courseDuration !== "" &&
    options.addVideo !== "" &&
    options.noOfChapters > 0;

  const isNextDisabled = () => {
    switch (activeStep) {
      case 0:
        return !isCategoryValid();
      case 1:
        return !isTopicDescriptionValid();
      case 2:
        return !isOptionsValid();
      default:
        return false;
    }
  };

  const isGenerateButtonDisabled = () => !isOptionsValid();

  const generateCourseLayout = async () => {
    setIsGenerating(true);
    const BASIC_PROMPT =
      "Generate A Course Tutorial on Following Detail With field Course Name, Description, Along with Chapter Name, about, Duration";
    const USER_INPUT_PROMPT = `Category: ${category}, Topic: ${topic}, Level: ${options.difficultyLevel}, Duration: ${options.courseDuration}, No. Of Chapters: ${options.noOfChapters}, in JSON format`;
    const FINAL_PROMPT = `${BASIC_PROMPT}\n${USER_INPUT_PROMPT}`;

    try {
      const result = await generateCourseLayoutAI.sendMessage(FINAL_PROMPT);
      const responseText = result.response.text();
      const parsedData = JSON.parse(responseText);
      const courseId = uuid4();
      const courseData = {
        courseId,
        name: topic,
        category,
        level: options.difficultyLevel,
        courseOutput: parsedData,
        createdBy: user?.primaryEmailAddress?.emailAddress,
        userId: user?.id,
        userName: user?.fullName,
        userProfileImage: user?.imageUrl,
      };

      const response = await fetch("/api/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(courseData),
      });

      if (!response.ok) {
        throw new Error("Failed to add course");
      }

      const newCourse = await response.json();
      console.log("Course added:", newCourse);
      router.replace(`/create-course/${courseId}`);
    } catch (error) {
      console.error("Error generating or saving course layout:", error);
    } finally {
      setIsGenerating(false);
    }
  };
  return (
    <div>
      {/* Stepper */}
      <div className="flex flex-col justify-center items-center">
        <h2 className="text-4xl text-secondary font-medium">Create Course</h2>
        <div className="flex mt-10">
          {StepperOptions.map((item, index) => (
            <div key={item.id} className="flex items-center">
              <div className="flex flex-col items-center w-[50px] md:w-[100px]">
                <div
                  className={`bg-gray-50 p-3 rounded-full text-black ${
                    activeStep >= index && "bg-secondary text-white"
                  }`}
                >
                  {item.icon}
                </div>
                <h2 className="hidden mt-2 md:block md:text-sm">{item.name}</h2>
              </div>
              {index === StepperOptions.length - 1 ? null : (
                <div
                  className={`h-1 w-[50px] md:w-[100px] ${
                    activeStep - 1 >= index ? "bg-secondary" : "bg-white"
                  }`}
                ></div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="px-10 md:px-10 lg:px-44">
        {/* Components */}
        {activeStep === 0 && <SelectCategory />}
        {activeStep === 1 && <TopicDescription />}
        {activeStep === 2 && <SelectOption />}
        {/* Navigation buttons */}
        <div className="flex justify-between mt-10">
          <Button
            disabled={activeStep === 0}
            onClick={() => setActiveStep(activeStep - 1)}
            variant="outline"
          >
            Previous
          </Button>
          {activeStep < 2 ? (
            <Button
              onClick={() => setActiveStep(activeStep + 1)}
              disabled={isNextDisabled()}
            >
              Next
            </Button>
          ) : (
            <Button
              disabled={isGenerateButtonDisabled()}
              onClick={generateCourseLayout}
            >
              Generate Course Layout
            </Button>
          )}
        </div>
      </div>
      <LoadingModal loading={isGenerating} />
    </div>
  );
};

export default Page;
