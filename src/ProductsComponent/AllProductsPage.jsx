import React from 'react';
// Importing the components into products page.
import Header from '../HomeComponent/Header';
import ProductsPage from '../ProductsComponent/ProductsPage';
import Footer from '../HomeComponent/Footer';

// Homepage Component
 const AllProductsPage = () => {
    return (
        <div>
            {/* rendering the Header part */}
            <Header/>

            {/* rendering Products part */}
           <ProductsPage/>

            {/* Rendering the Footer section */}
            <Footer/>
        </div>
    );
};

export default AllProductsPage;