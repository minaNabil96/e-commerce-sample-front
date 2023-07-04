import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  headlessModalStatus: false,
  headlessModalMessage: "",
  headlessModalHeadName: "",
  headlessModalPayload: {},
};

export const headlessModalSlice = createSlice({
  name: "headlessModalSlice",
  initialState,
  reducers: {
    modalStatus: (state, action) => {
      state.headlessModalStatus = !state.headlessModalStatus;
    },
    modalMessage: (state, action) => {
      state.headlessModalMessage = action.payload;
    },
    modalPayload: (state, action) => {
      state.headlessModalPayload = action.payload;
    },
    modalHeadName: (state, action) => {
      state.headlessModalHeadName = action.payload;
    },
    closeModal: (state, action) => {
      state.headlessModalMessage = "";
      state.headlessModalPayload = {};
    },
  },
});

export const {
  modalStatus,
  modalMessage,
  modalPayload,
  modalHeadName,
  closeModal,
} = headlessModalSlice.actions;
export default headlessModalSlice.reducer;
