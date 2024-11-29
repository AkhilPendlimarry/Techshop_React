import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import LandingPage from "./HomeComponent/LandingPage";
import AllProductsPage from './ProductsComponent/AllProductsPage';
import { Routes, Route } from 'react-router-dom';
import CartPage from './ProductsComponent/CartPage';
import { CartProvider } from './ProductsComponent/cartContext';
import DetailedProductPage from './ProductsComponent/DetailedProductPage';

const App = ()=> {
  return (
    <div>
      <CartProvider>
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/ProductsPage' element={<AllProductsPage/>}/>
        <Route path='/CartPage' element={<CartPage/>}/>
        {/* added route for detailed product page */}
        <Route path='/DetailedProductPage/:productId' element={<DetailedProductPage/>}/> 
      
      </Routes>

      </CartProvider>
      
      
    </div>
  );
}

export default App;

