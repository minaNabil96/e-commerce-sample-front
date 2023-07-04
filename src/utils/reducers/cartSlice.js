import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = { ...action.payload };
      const exist = state.cart.find(
        (productInCart) => productInCart._id === product._id
      );
      if (exist) {
        exist.required += 1;
      } else {
        state.cart.push({ ...product, required: 1 });
      }
    },
    increament: (state, action) => {
      const product = state.cart.find(
        (product) => product._id === action.payload._id
      );
      if (product) {
        if (product.required < product.quantity) {
          product.required += 1;
        }
      }
    },
    decrement: (state, action) => {
      const product = state.cart.find(
        (product) => product._id === action.payload
      );
      if (product) {
        if (product.required > 1) {
          product.required -= 1;
        }
      }
    },
    clearCart: (state, action) => {
      return (state.cart = []);
    },
    removeFromCart: (state, action) => {
      const productId = action.payload;
      const many = state.cart.find(
        (product) => product._id === productId && product.required > 1
      );
      // if (many) {
      //   many.required -= 1;
      // } else {
      //   state.cart = state.cart.filter(({ _id }) => _id !== action.payload);
      // }
      state.cart = state.cart.filter(({ _id }) => _id !== action.payload);
    },
  },
});

export const { addToCart, clearCart, removeFromCart, increament, decrement } =
  cartSlice.actions;
export default cartSlice.reducer;
