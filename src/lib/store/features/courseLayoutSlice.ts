import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Course } from "@/types/course";

const initialState: Course = {
  id: 0,
  courseId: "",
  name: "",
  category: "",
  level: "",
  includeVideo: "",
  courseOutput: {
    course_name: "",
    description: "",
    chapters: [],
    category: "",
    topic: "",
    level: "",
    duration: "",
    no_of_chapters: 0,
  },
  createdBy: "",
  userName: "",
  userId: "",
  userProfileImage: "",
};

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    setCourseData: (state, action: PayloadAction<Course>) => {
      return action.payload;
    },
    updateCourseInfo: (state, action: PayloadAction<Partial<Course>>) => {
      return { ...state, ...action.payload };
    },
    updateChapter: (
      state,
      action: PayloadAction<{
        index: number;
        chapter: { chapter_name: string; about: string };
      }>
    ) => {
      const { index, chapter } = action.payload;
      if (state.courseOutput.chapters[index]) {
        state.courseOutput.chapters[index] = {
          ...state.courseOutput.chapters[index],
          ...chapter,
        };
      }
    },
  },
});

export const { setCourseData, updateCourseInfo, updateChapter } =
  courseSlice.actions;

export default courseSlice.reducer;
