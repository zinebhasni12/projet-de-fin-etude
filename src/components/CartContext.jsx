import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();


export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('shoppingCart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    const addToCart = (product) => {
        const existingItem = cart.find(item => item._id === product._id);
        if (existingItem) {
            // Update the quantity if the item is already in the cart
            const newCart = cart.map(item =>
                item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
            );
            setCart(newCart);
        } else {
            // Add new item with quantity of 1
            setCart([...cart, { ...product, quantity: 1 }]);
        }
    };

    const removeFromCart = (_id) => {
        const newCart = cart.filter(item => item._id !== _id);
        setCart(newCart);
    };

    const updateQuantity = (_id, newQuantity) => {
        const newCart = cart.map(item =>
            item._id === _id ? { ...item, quantity: newQuantity } : item
            );
        setCart(newCart);
    };
    

    useEffect(() => {
        localStorage.setItem('shoppingCart', JSON.stringify(cart));
    }, [cart]);

    const clearCart = () => {
        setCart([]); // Clear the cart
        localStorage.setItem('shoppingCart', JSON.stringify([])); // Update localStorage
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

            export const useCart = () => useContext(CartContext);