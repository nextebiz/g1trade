"use client";
import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "./Features/categories";
import provincesReducer from "./Features/provinces";
import citiesReducer from "./Features/browse_cities";
import searchReducer from "./Features/search";
export const store = configureStore({
  reducer: {
    categoriesReducer,
    provincesReducer,
    citiesReducer,
    searchReducer
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
