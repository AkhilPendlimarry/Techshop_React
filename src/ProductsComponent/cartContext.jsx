import React, { createContext, useContext, useState, useEffect } from 'react';

// Create Cart Context
const CartContext = createContext();

// CartProvider Component
export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cartItems')) || [];
        setCartItems(storedCart);
    }, []);

    const addToCart = (product) => {
        const existingProduct = cartItems.find(item => item.id === product.id);

        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            setCartItems(prev => [...prev, { ...product, quantity: 1 }]);
        }
        localStorage.setItem('cartItems', JSON.stringify(cartItems)); // Update localStorage
    };

    const removeFromCart = (id) => {
        const updatedCart = cartItems.filter(item => item.id !== id);
        setCartItems(updatedCart);
        localStorage.setItem('cartItems', JSON.stringify(updatedCart)); // Update localStorage
    };

    const incrementQuantity = (id) => {
        setCartItems(prev =>
            prev.map(item =>
                item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
        localStorage.setItem('cartItems', JSON.stringify(cartItems)); // Update localStorage
    };

    const decrementQuantity = (id) => {
        setCartItems(prev => {
            const updatedCart = prev.map(item =>
                item.id === id ? { ...item, quantity: item.quantity - 1 } : item
            );
            const filteredCart = updatedCart.filter(item => item.quantity > 0);
            localStorage.setItem('cartItems', JSON.stringify(filteredCart)); // Update localStorage
            return filteredCart;
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
