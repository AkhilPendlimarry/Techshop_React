import React, { useState, useEffect } from 'react';
import Header from '../HomeComponent/Header';
import { FaShoppingCart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

const CartPage = () => {
    const navigate = useNavigate(); // Initialize the navigate function
    const [cartItems, setCartItems] = useState([]); // manages cart items
    const [visibleItems, setVisibleItems] = useState(2); // Initially show 2 items
    
    
    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cartItems')) || [];
        setCartItems(storedCart);
    }, []);

    const handleStartShopping = () => {
        navigate('/ProductsPage'); // Navigate to the All_products page when the button is clicked
    };

    const handleRemoveItemFromCart = (id) => {
        const updatedCart = cartItems.filter(item => item.id !== id);
        setCartItems(updatedCart);
        localStorage.setItem('cartItems', JSON.stringify(updatedCart));
        
    };

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

     // Load more products when scrolling
    const loadMoreItems = () => {
     if (cartItems.length > visibleItems) {
      setVisibleItems(visibleItems + 2); // Show 2 more items
    }
  };

  // Order summary component
    const originalPrice = cartItems.reduce((acc, item) => acc + item.originalPrice * item.quantity, 0); // Sum of all original prices
    const discountPrice = originalPrice * 0.5; // 50% discount
    const totalAfterDiscount = originalPrice - discountPrice;




    return (
        <div>
            <Header/>
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
                            <div className='col-md-6'>
                                <h2>Your Cart Items</h2>
                        
                                    <div className="cart-items" style={{ maxHeight: "400px", overflowY: "auto" }}>
                                        {cartItems.slice(0, visibleItems).map(item => (
                                            <div key={item.id} 
                                            className="cart-item d-flex align-items-center justify-content-center" 
                                            style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ccc', borderRadius: '8px', backgroundColor: 'black', color: '#fff' }}>
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
                                    <button className="mt-4 p-2" onClick={loadMoreItems}>
                                        Load More
                                    </button>
                            </div>
                    

                        {/* Order Summary */}
                        <div className="col-md-6">
                        <div className="order-summary mt-4"
                        style={{ color:"white",background: "transparent", borderRadius: "8px" }}>
                            <h4>
                                Order Summary <span>({cartItems.length} items)</span>
                            </h4>
                            <div className="d-flex justify-content-between">
                                <span>Original Price:</span>
                                <span>${originalPrice.toFixed(2)}</span>
                            </div>
                            <div className="d-flex justify-content-between">
                                <span>Discount:</span>
                                <span>-${discountPrice.toFixed(2)}</span>
                            </div>
                            
                            <hr />
                            <div className="d-flex justify-content-between">
                                <strong>Total Price:</strong>
                                <strong>${(totalAfterDiscount).toFixed(2)}</strong>
                            </div>
                            <hr />
                            <button className="btn btn-danger w-50 mt-2">Proceed to Checkout</button>
                            </div>
                        </div>
                    
                        
                    </div>
                    <button className='mt-4 p-2' onClick={handleStartShopping}>Continue Shopping</button>
            
                    </div>
                )}
            </div>
        </div>
            
          
    );
};

export default CartPage;
