import React, { createContext, useContext, useState, useEffect } from 'react';

// Create Cart Context
const CartContext = createContext();

// CartProvider Component
export const CartProvider = ({ children }) =>{
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cartItems')) || [];
        setCartItems(storedCart);
    }, []);

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product) => {
        setCartItems(prev => {
            const existingProduct = prev.find(item => item.id === product.id);
            if (existingProduct) {
                return prev.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                return [...prev, { ...product, quantity: 1 }];
            }
        });
    };

    const removeFromCart = (id) => {
        setCartItems(prev => prev.filter(item => item.id !== id));
    };

    const incrementQuantity = (id) => {
        setCartItems(prev =>
            prev.map(item =>
                item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

    const decrementQuantity = (id) => {
        setCartItems(prev => {
            const updatedCart = prev.map(item =>
                item.id === id ? { ...item, quantity: item.quantity - 1 } : item
            );
            return updatedCart.filter(item => item.quantity > 0);
        });
    };

    const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, incrementQuantity, decrementQuantity, cartCount }}>
            {children}
        </CartContext.Provider>
    );
};

// Custom Hook for Cart Context
export const useCart = () => {
    return useContext(CartContext);
};
