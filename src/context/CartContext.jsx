import { createContext, useContext, useState } from "react";

const CartContext = createContext();

//Provider Component
export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  //Add to Cart
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);

      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  //Remove from Cart
  const removeFromCart = (productId) => {
    setCartItems((prevItems) => {
      return prevItems
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0);
    });
  };
  //Value shared by context
  const value = {
    cartItems,
    addToCart,
    removeFromCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
export function useCart() {
  return useContext(CartContext);
}
