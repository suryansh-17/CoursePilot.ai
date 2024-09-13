import { configureStore } from "@reduxjs/toolkit";
import userCourseInput from "./features/userCourseInputSlice";
import courseLayout from "./features/courseLayoutSlice";
export const makeStore = () => {
  return configureStore({
    reducer: {
      userCourseInput: userCourseInput,
      courseLayout: courseLayout,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
