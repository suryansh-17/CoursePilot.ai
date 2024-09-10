import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CourseState {
  category: string | null;
  topic: string;
  description: string;
  options: {
    difficultyLevel: string;
    courseDuration: string;
    addVideo: string;
    noOfChapters: number;
  };
}

const initialState: CourseState = {
  category: "",
  topic: "",
  description: "",
  options: {
    difficultyLevel: "",
    courseDuration: "",
    addVideo: "",
    noOfChapters: 0,
  },
};

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
    },

    setTopic: (state, action: PayloadAction<string>) => {
      state.topic = action.payload;
    },
    setDescription: (state, action: PayloadAction<string>) => {
      state.description = action.payload;
    },

    setOptions: (
      state,
      action: PayloadAction<{
        difficultyLevel: string;
        courseDuration: string;
        addVideo: string;
        noOfChapters: number;
      }>
    ) => {
      state.options.difficultyLevel = action.payload.difficultyLevel;
      state.options.courseDuration = action.payload.courseDuration;
      state.options.addVideo = action.payload.addVideo;
      state.options.noOfChapters = action.payload.noOfChapters;
    },
  },
});

export const { setCategory, setTopic, setDescription, setOptions } =
  courseSlice.actions;

export default courseSlice.reducer;
