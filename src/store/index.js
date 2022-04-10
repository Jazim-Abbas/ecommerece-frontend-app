import { configureStore } from "@reduxjs/toolkit";
import favReducer from "./fav";
import cartReducer from "./cart";

const store = configureStore({
  reducer: {
    favorite: favReducer,
    cart: cartReducer,
  },
});

export { store };
