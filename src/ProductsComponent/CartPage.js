import React, { useState, useEffect } from 'react';
// import Header from '../HomeComponent/Header';
import { FaShoppingCart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

const CartPage = () => {
    const navigate = useNavigate(); // Initialize the navigate function
    const [cartItems, setCartItems] = useState([]); // manages cart items
    
    const handleStartShopping = () => {
        navigate('/ProductsPage'); // Navigate to the All_products page when the button is clicked
    };

    const handleRemoveItemFromCart = (id) => {
        const updatedCart = cartItems.filter(item => item.id !== id);
        setCartItems(updatedCart);
        localStorage.setItem('cartItems', JSON.stringify(updatedCart));
    };

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cartItems')) || [];
        setCartItems(storedCart);
    }, []);

    const handleIncrement = (id) => {
        const updatedCart = cartItems.map(item => {
            if (item.id === id) {
                return { ...item, quantity: item.quantity + 1 }; // Increment quantity
            }
            return item;
        });
        setCartItems(updatedCart);
        localStorage.setItem('cartItems', JSON.stringify(updatedCart)); // Update localStorage
    };

    const handleDecrement = (id) => {
        const updatedCart = cartItems
            .map(item => {
                if (item.id === id) {
                    if (item.quantity > 1) {
                        return { ...item, quantity: item.quantity - 1 }; // Decrement quantity
                    } else {
                        return null; // If quantity drops below 1, remove the item
                    }
                }
                return item;
            })
            .filter(item => item !== null); // Remove null items from the cart

        setCartItems(updatedCart);
        localStorage.setItem('cartItems', JSON.stringify(updatedCart)); // Update localStorage
    };


    return (
        <div className='container mt-5 text-center text-danger'>
            {cartItems.length === 0 ? (
                <div>
                    <h2>Cart is Empty</h2>
                    <FaShoppingCart size={200} />
                    <div>
                        <button className='mt-4' onClick={handleStartShopping}>Start Shopping</button>
                    </div>
                </div>
            ) : (
                <div className='container'>
                    <div className='row'>
                        <div className='col lg-8 md-4'>
                            <h2>Your Cart Items</h2>
                    
                                <div className="cart-items">
                                    {cartItems.map(item => (
                                        <div key={item.id} className="cart-item d-flex align-items-center justify-content-center" style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ccc', borderRadius: '8px', backgroundColor: 'black', color: '#fff' }}>
                                            <img src={item.images[0]} alt={item.title} style={{ width: '100px', height: 'auto', marginRight: '20px' }} />
                                            <div className="product-details" style={{ flex: 1 }}>
                                                <h5>{item.title}</h5>
                                                <p>Original Price: <span style={{ textDecoration: 'line-through' }}>${item.originalPrice}</span></p>
                                                <p>Final Price: ${item.finalPrice*item.quantity}</p>
                                                <div>
                                                    <button className="btn btn-danger" onClick={() => handleDecrement(item.id)}> - </button>
                                                    <span style={{ margin: '0 10px' }}>{item.quantity}</span>
                                                    <button className="btn btn-primary" onClick={() => handleIncrement(item.id)}> + </button>
                                                </div>
                                            </div>
                                            <button className="btn btn-danger" onClick={() => handleRemoveItemFromCart(item.id)}>
                                                Remove
                                            </button>
                                        </div>
                                    ))}
                                </div>
                    </div>
                </div>
                 
                    <button className='mt-4 p-2' onClick={handleStartShopping}>Continue Shopping</button>
                </div>
            )}
        </div>
    );
};

export default CartPage;
