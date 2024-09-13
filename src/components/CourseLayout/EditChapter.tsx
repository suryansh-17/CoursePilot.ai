"use client";

import { Course } from "@/types/course";
import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FiEdit } from "react-icons/fi";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useAppDispatch } from "@/lib/store/hooks";
import { updateCourseInfo } from "@/lib/store/features/courseLayoutSlice";

interface CourseBasicInfoProps {
  course: Course;
  index: number;
}

const EditChapter: React.FC<CourseBasicInfoProps> = ({ course, index }) => {
  const courseOutput = course.courseOutput;
  const [name, setName] = useState(courseOutput.chapters[index].chapter_name);
  const [about, setAbout] = useState(courseOutput.chapters[index].about);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const dispatch = useAppDispatch();
  const handleSave = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Prepare the updated course data
      const updatedChapters = [...courseOutput.chapters];
      updatedChapters[index] = {
        ...updatedChapters[index],
        chapter_name: name,
        about: about,
      };

      const updatedCourse = {
        ...course,
        courseOutput: {
          ...courseOutput,
          chapters: updatedChapters,
        },
      };

      // Call the API to update the course
      const response = await fetch(`/api/courses`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...updatedCourse,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData?.error || "Failed to update chapter");
        return;
      }

      // Handle successful update
      dispatch(updateCourseInfo(updatedCourse));
      setSuccess(true);
      console.log("Chapter updated successfully:", updatedCourse);
    } catch (error) {
      setError(
        `Failed to update chapter: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <FiEdit className="text-primary cursor-pointer ml-2" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-primary">Edit Chapter</DialogTitle>
          <DialogDescription>
            <div className="mt-3">
              <label htmlFor="chapter-name">Chapter Name</label>
              <Input
                id="chapter-name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                disabled={loading}
              />
            </div>
            <div className="mt-2">
              <label htmlFor="chapter-description">Description</label>
              <Textarea
                id="chapter-description"
                value={about}
                className="h-40"
                onChange={(event) => setAbout(event.target.value)}
                disabled={loading}
              />
            </div>
            {/* Display Success Message */}
            {success && (
              <p className="text-green-500 mt-2">
                Chapter updated successfully!
              </p>
            )}
            {/* Display Error Message */}
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button onClick={handleSave} disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditChapter;
