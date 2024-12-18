import { configureStore } from "@reduxjs/toolkit";
import newsSlice from "./newsSlice";
import { useDispatch } from "react-redux";


export const store = configureStore({
  reducer: {
    news: newsSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
