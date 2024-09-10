import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { setCategory } from "@/lib/store/features/userCourseInputSlice";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const CategoryOptions = [
  {
    id: 1,
    name: "Programming",
    img: "/programming.png",
  },
  {
    id: 2,
    name: "Fitness",
    img: "/fitness.png",
  },
  {
    id: 3,
    name: "Creative",
    img: "/creative-brain.png",
  },
];

const SelectCategory: React.FC = () => {
  const dispatch = useAppDispatch();
  const selectedCategory = useAppSelector(
    (state) => state.userCourseInput.category
  );

  const handleCategoryChange = (category: string) => {
    dispatch(setCategory(category));
  };

  return (
    <div className="px-10 md:px-20 mt-10">
      <h2>Select Course Category</h2>
      <div className="grid grid-cols-3 gap-10 mt-5">
        {CategoryOptions.map((item) => (
          <div
            key={item.id}
            className={`flex flex-col p-5 border items-center rounded-xl cursor-pointer ${
              selectedCategory === item.name
                ? "bg-primary border-purple-100"
                : "hover:bg-primary hover:border-purple-100"
            }`}
            onClick={() => handleCategoryChange(item.name)}
          >
            <Image src={item.img} width={50} height={50} alt={item.name} />
            <h2
              className={`mt-2 ${
                selectedCategory === item.name ? "font-bold" : ""
              }`}
            >
              {item.name}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectCategory;
