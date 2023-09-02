import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  session: null,
};

const getSession = createSlice({
  name: "session",
  initialState,
  reducers: {
    saveSession: (state, action: PayloadAction<any>) => {
      return { ...state, session: action.payload };
    },
  },
});

export const { saveSession } = getSession.actions;
export default getSession.reducer;
