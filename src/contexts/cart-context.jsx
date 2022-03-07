import React, { useContext } from "react";

const CartContext = React.createContext();

export function CartProvider({ children }) {
  return <CartContext.Provider>{children}</CartContext.Provider>;
}

export const useCartContext = () => useContext(CartContext);
