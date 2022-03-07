import React, { useContext, useState } from "react";

const CartContext = React.createContext({
  cart: {},
  onAddToCart: () => {},
});

export function CartProvider({ children }) {
  const [cart, setCart] = useState({});

  const handleAddToCart = (item, quantity) => {
    let newCart = { ...cart };

    if (cart[item.id]) {
      newCart[item.id].quantity = newCart[item.id].quantity + quantity;
    } else {
      newCart[item.id] = item;
      newCart[item.id].quantity = quantity;
    }

    setCart({ ...newCart });
  };

  return (
    <CartContext.Provider value={{ cart, onAddToCart: handleAddToCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCartContext = () => useContext(CartContext);
