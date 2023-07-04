import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  materialModalStatus: false,
  materialModalMessage: "",
  materialModalHeadName: "",
  materialModalPayload: {},
};

export const materialModalSlice = createSlice({
  name: "materialModalSlice",
  initialState,
  reducers: {
    modalStatus: (state, action) => {
      state.materialModalStatus = !state.materialModalStatus;
    },
    modalMessage: (state, action) => {
      state.materialModalMessage = action.payload;
    },
    modalPayload: (state, action) => {
      state.materialModalPayload = action.payload;
    },
    modalHeadName: (state, action) => {
      state.materialModalHeadName = action.payload;
    },
    closeModal: (state, action) => {
      state.materialModalMessage = "";
      state.materialModalPayload = {};
    },
  },
});

export const {
  modalStatus,
  modalMessage,
  modalPayload,
  modalHeadName,
  closeModal,
} = materialModalSlice.actions;
export default materialModalSlice.reducer;
