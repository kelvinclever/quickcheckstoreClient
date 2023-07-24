import { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(
    localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
  );

  const addToCart = (item) => {
    const isItemInCart = cartItems.find((cartItem) => cartItem.ProductID === item.ProductID);

    if (isItemInCart) {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.ProductID === item.ProductID
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (item) => {
    const isItemInCart = cartItems.find((cartItem) => cartItem.ProductID === item.ProductID);

    if (isItemInCart.quantity === 1) {
      setCartItems(cartItems.filter((cartItem) => cartItem.ProductID !== item.ProductID));
    } else {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.ProductID === item.ProductID
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        )
      );
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartItemPrice = (item) => {
    return item.SalePrice ? item.SalePrice : item.Price;
  };

  const getCartTotal = () => {
    return cartItems.reduce(
      (total, item) => total + getCartItemPrice(item) * item.quantity,
      0
    );
  };

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    const cartItems = localStorage.getItem('cartItems');
    if (cartItems) {
      setCartItems(JSON.parse(cartItems));
    }
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        getCartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
