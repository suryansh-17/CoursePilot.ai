"use client";

import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { FiEdit } from "react-icons/fi";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Course } from "@/types/course";
import { updateCourseInfo } from "@/lib/store/features/courseLayoutSlice"; // Import the action

interface CourseBasicInfoProps {
  course: Course;
}

const EditCourseInfo: React.FC<CourseBasicInfoProps> = ({ course }) => {
  const [name, setName] = useState(course.courseOutput.course_name);
  const [description, setDescription] = useState(
    course.courseOutput.description
  );
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const dispatch = useDispatch();

  // useEffect to update the state when the course prop changes
  useEffect(() => {
    setName(course.courseOutput.course_name);
    setDescription(course.courseOutput.description);
  }, [course]);

  const handleSave = async () => {
    setLoading(true);
    setError(null); // Reset error before the update
    setSuccess(false); // Reset success message before the update

    try {
      // Prepare updated course data
      const updatedCourse = {
        ...course,
        courseOutput: {
          ...course.courseOutput,
          course_name: name,
          description: description,
        },
      };

      // Dispatch action to update the Redux store
      dispatch(updateCourseInfo(updatedCourse));

      // Call the API to update the course
      const response = await fetch(`/api/courses`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedCourse),
      });

      if (!response.ok) {
        // Check for error message in the response body
        const errorData = await response.json();
        setError(errorData?.error || "Failed to update course");
        return;
      }

      // Handle successful update
      console.log("Course updated successfully");

      // Optionally, get the updated course data from the response if needed
      const updatedCourseResponse = await response.json();

      // Update the state with the response data
      setName(updatedCourseResponse.courseOutput.course_name || name);
      setDescription(
        updatedCourseResponse.courseOutput.description || description
      );
      setSuccess(true);
    } catch (error) {
      // Handle errors and display user-friendly error messages
      setError(
        `Failed to update course: ${(error as Error).message || String(error)}`
      );
    } finally {
      setLoading(false); // Reset loading state after the request completes
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <FiEdit className="text-primary cursor-pointer ml-2" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-primary">
            Edit Course Title & Description
          </DialogTitle>
          <DialogDescription>
            <div className="mt-3">
              <label htmlFor="course-name">Course Title</label>
              <Input
                id="course-name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                disabled={loading} // Disable input during the update process
              />
            </div>
            <div className="mt-2">
              <label htmlFor="course-description">Description</label>
              <Textarea
                id="course-description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                className="h-40"
                disabled={loading} // Disable input during the update process
              />
            </div>
            {/* Display Success Message */}
            {success && (
              <p className="text-green-500 mt-2">
                Course updated successfully!
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

export default EditCourseInfo;
