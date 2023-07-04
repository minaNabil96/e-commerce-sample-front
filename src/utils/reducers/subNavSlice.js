import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  navExpand: false,
  navClose: false,
  sorted: [],
  termForSearch: "",
};

const subNavSlice = createSlice({
  name: "subNav",
  initialState,
  reducers: {
    subNavExpand: (state, action) => {
      state.navExpand = !state.navExpand;
      state.navClose = false;
    },
    subNavClose: (state, action) => {
      state.navClose = true;
      state.navExpand = false;
    },
    subNavSort: (state, action) => {
      state.sorted = action.payload;
    },
    subNavSearch: (state, action) => {
      state.termForSearch = action.payload;
    },
  },
});

export const { subNavExpand, subNavClose, subNavSort, subNavSearch } =
  subNavSlice.actions;
export default subNavSlice.reducer;
