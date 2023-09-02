"use client";

import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CounterState {
  value: number;
}

const initialState: CounterState = {
  value: 0,
};

const counter = createSlice({
  name: "counter",
  initialState,
  reducers: {
    addCount: (state) => {
      state.value += 1;
    },
    reduceCount: (state) => {
      state.value -= 1;
    },
    addCustom: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

export const { addCount, reduceCount, addCustom } = counter.actions;
export default counter.reducer;
