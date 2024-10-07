import { configureStore } from "@reduxjs/toolkit";
import AllInfoSlice from "./reducer";

export const store = configureStore({
  reducer: {
    info: AllInfoSlice,
  },
});
