"use client";
import { useUser } from "@clerk/nextjs";
import React from "react";
import { Button } from "../ui/button";

const AddCourse: React.FC = () => {
  const { user } = useUser();

  return (
    <div className="flex items-center justify-between">
      <div>
        <h2>
          Hello, <span className="font-bold">{user?.fullName}</span>{" "}
        </h2>
        <p className="text-sm">Create new course with AI</p>
      </div>
      <Button>+ Create New Course</Button>
    </div>
  );
};

export default AddCourse;
