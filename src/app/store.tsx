import { configureStore } from "@reduxjs/toolkit";
import main from "@mainSlice";
import { apiSlice } from "./apiSlice";
import { useDispatch } from "react-redux";
const store = configureStore({
  reducer: {
    main,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export default store;
