import React from 'react';
// Importing the components into home page.
import Header from './Header';
import CartPage from '../ProductsComponent/CartPage';
import HeroSection from './HeroSection';
import FeaturedProducts from './FeaturedProducts';
import TopProducts from './TopProducts';
import Footer from './Footer';

// Homepage Component
 const LandingPage = () => {
    return (
        <div>
            {/* Rendering the Header part */}
            <Header/>

            {/* Rendering the Hero Section carousel */}
            <HeroSection/>

            {/* Rendering the Featured Products section */}
            <section className="my-5">
                <h2 className="text-center mb-4">Featured Products</h2>
                <FeaturedProducts/>
            </section>

            {/* Rendering the Top Products section */}
            <section className="my-5">
                <h2 className="text-center mb-4">Top Products</h2>
                <TopProducts/>
            </section>

            {/* Rendering the Footer section */}
            <Footer/>
        </div>
    );
};

export default LandingPage;