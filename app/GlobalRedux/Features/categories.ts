"use client";
import { createSlice } from "@reduxjs/toolkit";

import type { PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  categories: [] as Category[],
};

const resetState = initialState;

const categories = createSlice({
  name: "categories",
  initialState,
  reducers: {
    resetCategories: (state) => {
      return resetState;
    },
    addCategories: (state, action: PayloadAction<Category>) => {
      return {
        ...state,
        categories: [...state.categories, action.payload],
      };
    },
  },
});

export const { resetCategories, addCategories } = categories.actions;
export default categories.reducer;
