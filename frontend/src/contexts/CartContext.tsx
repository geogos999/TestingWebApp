import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { CART_API } from '../api/cart';

interface CartItem {
  id: string;
  productId: string;
  quantity: number;
  product: {
    id: string;
    name: string;
    price: number;
    imageUrl?: string;
    stock: number;
  };
}

interface CartContextType {
  cart: CartItem[];
  fetchCart: () => Promise<void>;
  addToCart: (productId: string, quantity?: number) => Promise<void>;
  removeFromCart: (cartItemId: string) => Promise<void>;
  updateQuantity: (cartItemId: string, quantity: number) => Promise<void>;
  isLoading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCart = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(CART_API.get);
      setCart(res.data);
    } catch (err) {
      setCart([]);
    }
    setIsLoading(false);
  };

  const addToCart = async (productId: string, quantity = 1) => {
    await axios.post(CART_API.add, { productId, quantity });
    await fetchCart();
  };

  const removeFromCart = async (cartItemId: string) => {
    await axios.delete(CART_API.remove(cartItemId));
    await fetchCart();
  };

  const updateQuantity = async (cartItemId: string, quantity: number) => {
    await axios.put(CART_API.update(cartItemId), { quantity });
    await fetchCart();
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <CartContext.Provider value={{ cart, fetchCart, addToCart, removeFromCart, updateQuantity, isLoading }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};
