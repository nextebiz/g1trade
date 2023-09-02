import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  browse_provinces: [],
};

export const browse_cities = createSlice({
  name: "browse_cities",
  initialState,
  reducers: {
    setBrowseProvinces: (state, action: PayloadAction<any>) => {
      return { ...state, browse_provinces: action.payload };
    },
  },
});

export const { setBrowseProvinces } = browse_cities.actions;
export default browse_cities.reducer;
