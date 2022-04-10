import { createSlice } from "@reduxjs/toolkit";
import { omit } from "underscore";

const initialState = {
  cart: {},
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { item, quantity } = action.payload;
      let newCart = { ...state.cart };

      if (newCart[item._id]) {
        newCart[item._id].quantity = newCart[item._id].quantity + quantity;
      } else {
        newCart[item._id] = item;
        newCart[item._id].quantity = quantity;
      }

      state.cart = newCart;
    },
    removeFromCart: (state, action) => {
      const updatedCart = omit(state.cart, action.payload.itemId);
      state.cart = updatedCart;
    },
    resetCart: (state, _) => {
      state.cart = {};
    },
  },
});

const { addToCart, removeFromCart, resetCart } = cartSlice.actions;
export default cartSlice.reducer;

export const onAddToCart = (item, quantity) => (dispatch, getState) => {
  dispatch(addToCart({ item, quantity }));
};

export const onRemoveFromCart = (itemId) => (dispatch, getState) => {
  dispatch(removeFromCart({ itemId }));
};

export const onResetCart = () => (dispatch, getState) => {
  dispatch(resetCart());
};
