import React, { useState, useEffect } from 'react';
import productsData from '../data/productsData'; 
import { useCart } from './cartContext';
import './Product.css';     
import { useNavigate } from 'react-router-dom';
        

const ProductsPage = () => {
    const [category, setCategory] = useState('All'); // Initial state is "All"
    const [sortOption, setSortOption] = useState('Latest'); // Sorting state
    const [selectedBrands, setSelectedBrands] = useState([]); // Filters by brand
    const [filteredProducts, setFilteredProducts] = useState(productsData); // Initialize with all products
    const [priceRange, setPriceRange] = useState([0, 20000]);
    const categories = ['All', 'HeadPhones', 'Earbuds', 'EarPhones', 'Neckbands'];
    const brands = ['JBL', 'BoAt', 'Sony'];
    const { addToCart } = useCart();
    const navigate = useNavigate();

    // Filter products by category and brand
    useEffect(() => {
        let filtered = productsData;

        // Filter by category
        if (category !== 'All') {
            filtered = filtered.filter(product => product.category && product.category.toLowerCase() === category.toLowerCase());
        }

        // Filter by selected brands
        if (selectedBrands.length > 0) {
            filtered = filtered.filter(product => selectedBrands.map(brand => brand.toLowerCase()).includes(product.brand.toLowerCase()));
        }

        filtered = filtered.filter(product => 
            product.finalPrice >= priceRange[0] && product.finalPrice <= priceRange[1]
        );

        // Sort products
        if (sortOption === 'Price (Lowest First)') {
            filtered = filtered.sort((a, b) => a.finalPrice - b.finalPrice);
        } else if (sortOption === 'Price (Highest First)') {
            filtered = filtered.sort((a, b) => b.finalPrice - a.finalPrice);
        } else if (sortOption === 'Top Rated') {
            filtered = filtered.sort((a, b) => b.rateCount - a.rateCount);
        }

        setFilteredProducts(filtered); // Updates filtered and sorted products
    }, [category, selectedBrands, sortOption, priceRange]);


    // clears all filters
    const clearFilters = () => {
        setCategory('All');
        setSelectedBrands([]);
        setSortOption('Latest');
        setPriceRange([0, 20000]);
        setFilteredProducts(productsData);
        
    };

    const isFiltered=()=>{
        return(
            category !== 'All' || selectedBrands.length > 0 || sortOption !== 'Latest' || priceRange[0] !== 0 || priceRange[1] !== 20000);
        };

    // Handle brand filtering
    const handleBrandChange = (e) => {
        const { value, checked } = e.target;
        setSelectedBrands(
            checked ? [...selectedBrands, value] : selectedBrands.filter(brand => brand !== value)
        );
    };

    // Handle sort option change
    const handleSortChange = (e) => {
        setSortOption(e.target.value);
    };

    // Handle product click to navigate to DetailedProductPage
    const handleProductClick = (productId) => {
        const selectedProduct = productsData.find(product => product.id === productId);
        navigate(`/DetailedProductPage/${productId}`, { state: selectedProduct });
    };

    return (
        <div className="container-fluid p-4 mt-5">
            <div className="row">
                {/* Sidebar Section */}
                <div className="col-md-3">
                    <div className="sidebar p-3">

                          {/* render clear button if filters applied. */}

                          {isFiltered() && 
                                    (<button className=' btn btn-danger mt-4' onClick={clearFilters}>
                                         Clear Filters
                                    </button>)
                                }


                        <h4>Sort by</h4>
                        <hr/>

                        {/* Sort By Section */}
                        <div className="sort-section mb-4">
                            <ul className="sort-list">
                                <li>
                                    <input type="radio" value="Latest" checked={sortOption === 'Latest'} onChange={handleSortChange} />
                                    Latest 
                                </li>
                                <li>
                                    <input type="radio" value="Price (Lowest First)" checked={sortOption === 'Price (Lowest First)'} onChange={handleSortChange} />
                                    Price (Lowest First)
                                </li>
                                <li>
                                    <input type="radio" value="Price (Highest First)" checked={sortOption === 'Price (Highest First)'} onChange={handleSortChange} />
                                    Price (Highest First)
                                </li>
                                <li>
                                    <input type="radio" value="Top Rated" checked={sortOption === 'Top Rated'} onChange={handleSortChange} />
                                    Top Rated
                                </li>
                            </ul>
                        </div>

                        {/* Filter By Brands */}
                        <div className="filter-brands mb-4">
                            <h5>Filter By Brands</h5>
                            <ul className="brand-list">
                                {brands.map((brand, index) => (
                                    <li key={index}>
                                        <input type="checkbox" value={brand} onChange={handleBrandChange} />
                                        {brand}
                                    </li>
                                ))}
                            </ul>
                        </div>

                      
                        {/* Filter By Category */}
                        <div className="filter-categories mb-4">
                            <h5>Filter By Category</h5>
                            <ul className="category-list">
                                {categories.map((cat, index) => (
                                    <li
                                        key={index}
                                        className={`list-group-item ${cat === category ? 'active' : ''}`}
                                        onClick={() => setCategory(cat)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        {cat}
                                    </li>
                                ))}
                            </ul>
                        </div>

                     {/* Price Range Implementation */}
                     <h5>Price</h5>
                        <input
                            type="range"
                            min="0"
                            max="20000"
                            value={priceRange[1]}
                            onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                        />
                        <div>{`Price: $${priceRange[0]} - $${priceRange[1]}`}</div>





                    </div>
                </div>

                {/* Products Section */}
                <div className="col-md-9">
                    <div className="row">
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map(product => (
                                <div className="card h-50 text-white" key={product.id} 
                                  style={{ flex: "0 1 20%", margin: "10px", background: "#161717", color: "white", borderRadius: "8px" }}
                                  onClick={()=>handleProductClick(product.id)}>
                                    <img src={product.images[0]} alt={product.title} className="img-fluid mb-2" style={{ height: '100px', objectFit: 'contain' }} />
                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '10px' }}>
                                        {[...Array(product.rateCount)].map((_, index) => (
                                            <span key={index} className="text-danger"><i className="fa-solid fa-star"></i></span>
                                        ))}
                                    </div>
                                    <h5>{product.title}</h5>
                                    <h6>{product.info}</h6>
                                    <pre>${product.finalPrice} <span className='discount'>${product.originalPrice}</span></pre>
                                    <button className='btn btn-danger mt-2' onClick={() => addToCart(product)}>Add to Cart</button>
                                </div>
                            ))
                        ) : (<p>No products found for this category.</p>)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductsPage;

