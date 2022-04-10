import { configureStore } from "@reduxjs/toolkit";
import favReducer from "./fav";

const store = configureStore({
  reducer: {
    favorite: favReducer,
  },
});

export { store };
