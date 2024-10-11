import React, { useState, useEffect } from 'react';
import productsData from '../data/productsData'; 
import './Product.css';              

const ProductsPage = () => {
    const [category, setCategory] = useState('All'); // Initial state is "All"
    const [sortOption, setSortOption] = useState('Latest'); // Sorting state
    const [selectedBrands, setSelectedBrands] = useState([]); // Filters by brand
    const [filteredProducts, setFilteredProducts] = useState(productsData); // Initialize with all products
    const [priceRange, setPriceRange] = useState([0, 20000]);
    const categories = ['All', 'HeadPhones', 'Earbuds', 'EarPhones', 'Neckbands'];
    const brands = ['JBL', 'BoAt', 'Sony'];

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

    return (
        <div className="container-fluid p-4 mt-5">
            <div className="row">
                {/* Sidebar Section */}
                <div className="col-md-3">
                    <div className="sidebar p-3">

                          {/* render clear button if filters applied. */}
                          {(category !== 'All' || selectedBrands.length > 0 || sortOption) 
                                  && (<button className=' btn btn-danger mt-4' onClick={clearFilters}>
                                         Clear Filters
                                    </button>
                                )}


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
                                  style={{ flex: "0 1 25%", margin: "10px", background: "#161717", color: "white", borderRadius: "8px" }}>
                                    <img src={product.images[0]} alt={product.title} className="img-fluid mb-2" style={{ height: '100px', objectFit: 'contain' }} />
                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '10px' }}>
                                        {[...Array(product.rateCount)].map((_, index) => (
                                            <span key={index} className="text-danger"><i className="fa-solid fa-star"></i></span>
                                        ))}
                                    </div>
                                    <h5>{product.title}</h5>
                                    <h6>{product.info}</h6>
                                    <pre>${product.finalPrice}     <span className='discount'>${product.originalPrice}</span></pre>
                                    <button className='text-white'>Add to Cart</button>
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



// import React, { useState, useEffect } from 'react';
// import productsData from '../data/productsData'; 
// import './Product.css';              

// const ProductsPage = () => {
//     // State Management
//     const [category, setCategory] = useState('All');
//     const [brands, setBrands] = useState([]); // Initially empty (no brands selected)
//     const [sortBy, setSortBy] = useState('Latest'); // Default sorting option
//     const [priceRange, setPriceRange] = useState([0, 1000]); // Example price range
//     const [filteredProducts, setFilteredProducts] = useState(productsData);

//     const categories = ['All', 'HeadPhones', 'Earbuds', 'EarPhones', 'Neckbands'];
//     const availableBrands = ['JBL', 'BoAt', 'Sony'];  // Assuming these are the available brands

//     // Reset Filters to Initial State
//     const resetFilters = () => {
//         setCategory('All');
//         setBrands([]);
//         setSortBy('Latest');
//         setPriceRange([0, 1000]);  // Reset price to initial range
//         setFilteredProducts(productsData);
//     };

//     // Filter and Sort Products based on state
//     useEffect(() => {
//         let updatedProducts = [...productsData];

//         // Apply Category Filter
//         if (category !== 'All') {
//             updatedProducts = updatedProducts.filter(product => product.category.toLowerCase() === category.toLowerCase());
//         }

//         // Apply Brand Filter
//         if (brands.length > 0) {
//             updatedProducts = updatedProducts.filter(product => brands.includes(product.brand));
//         }

//         // Apply Price Range Filter
//         updatedProducts = updatedProducts.filter(product => product.price >= priceRange[0] && product.price <= priceRange[1]);

//         // Apply Sorting (example: sort by price, rating, etc.)
//         if (sortBy === 'Price (Lowest First)') {
//             updatedProducts = updatedProducts.sort((a, b) => a.price - b.price);
//         } else if (sortBy === 'Price (Highest First)') {
//             updatedProducts = updatedProducts.sort((a, b) => b.price - a.price);
//         } else if (sortBy === 'Top Rated') {
//             updatedProducts = updatedProducts.sort((a, b) => b.rateCount - a.rateCount);
//         }

//         setFilteredProducts(updatedProducts);

//     }, [category, brands, priceRange, sortBy]);

//     // Check if any filter is applied
//     const isFilterApplied = category !== 'All' || brands.length > 0 || sortBy !== 'Latest' || priceRange[0] !== 0 || priceRange[1] !== 1000;

//     return (
//         <div className="container-fluid p-4 mt-5">
//             <div className="row">
//                 {/* Sidebar Section */}
//                 <div className="col-md-3">
//                     <div className="sidebar p-3">
//                         <h4>Filters</h4>

//                         {/* Category Filter */}
//                         <ul className="side-list-group">
//                             {categories.map((cat, index) => (
//                                 <li
//                                     key={index}
//                                     className={`list-group-item ${cat === category ? 'active' : ''}`}
//                                     onClick={() => setCategory(cat)}
//                                     style={{ cursor: 'pointer' }}
//                                 >
//                                     {cat}
//                                 </li>
//                             ))}
//                         </ul>

//                         {/* Brand Filter */}
//                         <h5>Brands</h5>
//                         {availableBrands.map((brand, index) => (
//                             <div key={index}>
//                                 <input
//                                     type="checkbox"
//                                     checked={brands.includes(brand)}
//                                     onChange={() => {
//                                         if (brands.includes(brand)) {
//                                             setBrands(brands.filter(b => b !== brand)); // Remove brand
//                                         } else {
//                                             setBrands([...brands, brand]); // Add brand
//                                         }
//                                     }}
//                                 />
//                                 <label>{brand}</label>
//                             </div>
//                         ))}

//                         {/* Sort Filter */}
//                         <h5>Sort By</h5>
//                         <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
//                             <option value="Latest">Latest</option>
//                             <option value="Price (Lowest First)">Price (Lowest First)</option>
//                             <option value="Price (Highest First)">Price (Highest First)</option>
//                             <option value="Top Rated">Top Rated</option>
//                         </select>

//                         {/* Price Range (Example Implementation) */}
//                         <h5>Price</h5>
//                         <input
//                             type="range"
//                             min="0"
//                             max="1000"
//                             value={priceRange[1]}
//                             onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
//                         />
//                         <div>{`Price: $${priceRange[0]} - $${priceRange[1]}`}</div>

//                         {/* Conditionally Render Clear Filter Button */}
//                         {isFilterApplied && (
//                             <button className="btn btn-danger mt-3" onClick={resetFilters}>
//                                 Clear Filters
//                             </button>
//                         )}
//                     </div>
//                 </div>

//                 {/* Products Section */}
//                 <div className="col-md-9">
//                     <div className="row">
//                         {filteredProducts.length > 0 ? (
//                             filteredProducts.map(product => (
//                                 <div className="card h-50 text-white" key={product.id}
//                                     style={{ flex: "0 1 25%", margin: "10px", background: "#161717", color: "white", borderRadius: "8px" }}>
//                                     <img src={product.images[0]} alt={product.title} className="img-fluid mb-2" style={{ height: '100px', objectFit: 'contain' }} />
//                                     <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '10px' }}>
//                                         {[...Array(product.rateCount)].map((_, index) => (
//                                             <span key={index} className="text-danger"><i className="fa-solid fa-star"></i></span>
//                                         ))}
//                                     </div>
//                                     <h5>{product.title}</h5>
//                                     <h6>{product.info}</h6>
//                                     <pre>${product.finalPrice}     <span className='discount'>${product.originalPrice}</span></pre>
//                                     <button className='text-white'>Add to Cart</button>
//                                 </div>
//                             ))
//                         ) : (<p>No products found for this category.</p>)}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ProductsPage;
