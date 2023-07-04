import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loggedIn: false,
  loggedOut: false,
  loggedAdmin: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    isLoggedIn: (state, action) => {
      state.loggedIn = true;
      state.loggedOut = false;
    },
    isLoggedOut: (state, action) => {
      state.loggedOut = true;
      state.loggedIn = false;
      state.loggedAdmin = false;
    },
    isAdmin: (state, action) => {
      state.loggedAdmin = true;
    },
  },
});

export const { isLoggedIn, isLoggedOut, isAdmin } = authSlice.actions;
export default authSlice.reducer;
