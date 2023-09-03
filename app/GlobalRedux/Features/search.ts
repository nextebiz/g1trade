import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  selected_category: {} as Category,
  selected_province: {} as Province,
  selected_city: {} as City,
  total: 0,
  take: 20,
  skip: 0,
  search_result: [] as Product[],
  search_loaded: false,
  refresh_search: false,
};

const search = createSlice({
  name: "products_search",
  initialState,
  reducers: {
    setSelectedCategory: (state, action: PayloadAction<Category>) => {
      return { ...state, selected_category: action.payload };
    },
    setSelectedProvince: (state, action: PayloadAction<Province>) => {
      return { ...state, selected_province: action.payload };
    },
    setSelectedCity: (state, action: PayloadAction<City>) => {
      return { ...state, selected_city: action.payload };
    },
    setTotal: (state, action: PayloadAction<number>) => {
      return { ...state, total: action.payload };
    },
    setSkip: (state, action: PayloadAction<number>) => {
      return { ...state, skip: action.payload };
    },
    setTake: (state, action: PayloadAction<number>) => {
      return { ...state, take: action.payload };
    },
    setSearchResult: (state, action: PayloadAction<Product>) => {
      // console.log(action); 

      // if(action.payload.id === )

      const search_id = state.search_result.find(
        (p) => p.id === action.payload.id
      );

      if (search_id) {
        // console.log("found product", search_id);
        return {
          ...state,
        };
      }

      return {
        ...state,
        search_result: [...state.search_result, action.payload],
      };
    },
    setSearchLoaded: (state, action: PayloadAction<boolean>) => {
      return { ...state, search_loaded: action.payload };
    },
    resetSearchResult: (state) => {
      return { ...state, search_result: [] };
    },
    setRefreshSearch: (state, action: PayloadAction<boolean>) => {
      return { ...state, refresh_search: action.payload };
    },
    setProductLike: (state, action: PayloadAction<any>) => {
      const product = action.payload.product;
      const perform = action.payload.perform;
      const tmpState = { ...state };

      tmpState.search_result = tmpState.search_result.map((myproduct) => {
        if (myproduct.id === product.id) {
          if (perform === "add") {
            myproduct._count.ProductLikes += 1;
          }
          if (perform === "remove") {
            myproduct._count.ProductLikes -= 1;
          }
        }
        return myproduct;
      });

      return void(tmpState);
    },
  },
});

export const {
  setSelectedCategory,
  setSelectedProvince,
  setSelectedCity,
  setTotal,
  setTake,
  setSkip,
  setSearchResult,
  setSearchLoaded,
  resetSearchResult,
  setRefreshSearch,
  setProductLike,
} = search.actions;
export default search.reducer;
