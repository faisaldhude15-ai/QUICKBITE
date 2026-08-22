import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";

const CartContext = createContext();

export const CartProvider = ({ children }) => {

  const [cart, setCart] = useState([]);

  const getCart = async () => {

    try {

      const { data } = await api.get("/cart");

      setCart(data.cart || []);

    } catch (error) {

      console.log(error);

    }

  };

  const addToCart = async (foodId, quantity = 1) => {

    try {

      await api.post("/cart/add", {
        foodId,
        quantity,
      });

      getCart();

    } catch (error) {

      console.log(error);

    }

  };

  const removeFromCart = async (foodId) => {

    try {

      await api.delete(`/cart/remove/${foodId}`);

      getCart();

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

    getCart();

  }, []);

  return (

    <CartContext.Provider

      value={{
        cart,
        addToCart,
        removeFromCart,
        getCart,
      }}

    >

      {children}

    </CartContext.Provider>

  );

};

export const useCart = () => useContext(CartContext);