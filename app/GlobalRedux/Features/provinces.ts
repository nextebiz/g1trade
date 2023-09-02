import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  provinces: [] as Province[],
};
const resetState = initialState;

const provinces = createSlice({
  name: "provinces",
  initialState,
  reducers: {
    resetProvinces: (state) => {
      return resetState;
    },
    addProvinces: (state, action: PayloadAction<Province>) => {
      return { ...state, provinces: [...state.provinces, action.payload] };
    },
    getProvinces: (state) => {
      return { ...state };
    },
    // findProvinceById: (state, action: PayloadAction<string>) => {
    //   return state.provinces.find((province) => province.id === action.payload);
    // },
  },
});

export const { resetProvinces, addProvinces, getProvinces } = provinces.actions;
export default provinces.reducer;
