"use client";
import { useUser } from "@clerk/nextjs";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

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
      <Link href={"/create-course"}>
        <Button>+ Create New Course</Button>
      </Link>
    </div>
  );
};

export default AddCourse;
