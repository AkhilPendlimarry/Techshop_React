 import React, { useState } from 'react';
 import { FaShoppingCart } from 'react-icons/fa';
 import { useNavigate } from 'react-router-dom';

 const CartPage = () => {
     const navigate = useNavigate(); // Initialize the navigate function
     const [cartItems, setCartItems] = useState([]); // manages cart items
     const handleStartShopping = () => {
         navigate('/'); // Navigate to the homepage when the button is clicked
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
            ): (
                <div>
                {/* Render cart items here */}
                <h2>Your Cart Items</h2>
                {/* Display the list of items */}
            </div>
            )}
             
         </div>
     );
 };
 export default CartPage;
