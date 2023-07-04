import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sideMenuStatus: false,
  sideMenuSmallStatus: false,
  selectedCategoryId: "",
};

const sideMenuSlice = createSlice({
  name: "sideMenuSlice",
  initialState,
  reducers: {
    menuStatus: (state, action) => {
      state.sideMenuStatus = !state.sideMenuStatus;
    },
    menuSmallStatus: (state, action) => {
      state.sideMenuSmallStatus = !state.sideMenuSmallStatus;
    },
    menuSelectedCategoryId: (state, action) => {
      state.selectedCategoryId = action.payload;
    },
  },
});

export const { menuStatus, menuSmallStatus, menuSelectedCategoryId } =
  sideMenuSlice.actions;
export default sideMenuSlice.reducer;
