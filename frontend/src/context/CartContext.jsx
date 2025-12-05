// frontend/src/context/CartContext.jsx
import { createContext, useContext, useState } from "react";

const CartContext = createContext(null);

// Helper: read initial cart from localStorage
const getInitialCart = () => {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem("cart");
  if (!stored) return [];
  try {
    return JSON.parse(stored);
  } catch (e) {
    console.error("Failed to parse stored cart", e);
    return [];
  }
};

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(getInitialCart); // lazy init from localStorage

  const save = (newItems) => {
    setItems(newItems);
    localStorage.setItem("cart", JSON.stringify(newItems));
  };

  const addToCart = (book) => {
    const existing = items.find((it) => it.book._id === book._id);
    let newItems;
    if (existing) {
      newItems = items.map((it) =>
        it.book._id === book._id ? { ...it, quantity: it.quantity + 1 } : it
      );
    } else {
      newItems = [...items, { book, quantity: 1 }];
    }
    save(newItems);
  };

  const removeFromCart = (bookId) => {
    const newItems = items.filter((it) => it.book._id !== bookId);
    save(newItems);
  };

  const updateQuantity = (bookId, quantity) => {
    if (quantity <= 0) {
      return removeFromCart(bookId);
    }
    const newItems = items.map((it) =>
      it.book._id === bookId ? { ...it, quantity } : it
    );
    save(newItems);
  };

  const clearCart = () => {
    save([]);
  };

  const total = items.reduce((sum, it) => sum + it.book.price * it.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => useContext(CartContext);
