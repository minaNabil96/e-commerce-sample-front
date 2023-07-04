import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import headlessModalSlice from "./reducers/headlessModalSlice";
import subNavSlice from "./reducers/subNavSlice";
import authSlice from "./reducers/authSlice";
import cartSlice from "./reducers/cartSlice";
import sideMenuSlice from "./reducers/sideMenuSlice";
import materialModalSlice from "./reducers/materialModalSlice";
export default configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    headlessModalSlice,
    materialModalSlice,
    subNavSlice,
    authSlice,
    cartSlice,
    sideMenuSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: false,
});
