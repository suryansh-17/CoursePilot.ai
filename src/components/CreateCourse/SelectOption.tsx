import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "../ui/input";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { setOptions } from "@/lib/store/features/userCourseInputSlice";

const SelectOption: React.FC = () => {
  const dispatch = useAppDispatch();
  const { difficultyLevel, courseDuration, addVideo, noOfChapters } =
    useAppSelector((state) => state.userCourseInput.options);

  const handleDifficultyChange = (value: string) => {
    dispatch(
      setOptions({
        difficultyLevel: value,
        courseDuration,
        addVideo,
        noOfChapters,
      })
    );
  };

  const handleCourseDurationChange = (value: string) => {
    dispatch(
      setOptions({
        difficultyLevel,
        courseDuration: value,
        addVideo,
        noOfChapters,
      })
    );
  };

  const handleAddVideoChange = (value: string) => {
    dispatch(
      setOptions({
        difficultyLevel,
        courseDuration,
        addVideo: value,
        noOfChapters,
      })
    );
  };

  const handleNoOfChaptersChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    dispatch(
      setOptions({
        difficultyLevel,
        courseDuration,
        addVideo,
        noOfChapters: value,
      })
    );
  };

  return (
    <div className="px-10 md:px-20 lg:px-44">
      <div className="grid grid-cols-2 gap-10">
        <div>
          <label htmlFor="" className="text-sm">
            Difficulty Level
          </label>
          <Select
            onValueChange={handleDifficultyChange}
            value={difficultyLevel}
          >
            <SelectTrigger className="">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="advance">Advance</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label htmlFor="" className="text-sm">
            Course Duration
          </label>
          <Select
            onValueChange={handleCourseDurationChange}
            value={courseDuration}
          >
            <SelectTrigger className="">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1 Hour">1Hr</SelectItem>
              <SelectItem value="2 Hour">2Hr</SelectItem>
              <SelectItem value="More than 3">3Hr +</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label htmlFor="" className="text-sm">
            Add Video
          </label>
          <Select onValueChange={handleAddVideoChange} value={addVideo}>
            <SelectTrigger className="">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="yes">Yes</SelectItem>
              <SelectItem value="no">No</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label htmlFor="" className="text-sm">
            No of Chapters
          </label>
          <Input
            type="number"
            value={noOfChapters}
            onChange={handleNoOfChaptersChange}
          />
        </div>
      </div>
    </div>
  );
};

export default SelectOption;
