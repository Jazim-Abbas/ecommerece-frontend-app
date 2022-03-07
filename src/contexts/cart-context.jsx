import React, { useContext } from "react";

const CartContext = React.createContext();

export function CartProvider({ children }) {
  return (
    <CartContext.Provider value={{ data: "" }}>{children}</CartContext.Provider>
  );
}

export const useCartContext = () => useContext(CartContext);
