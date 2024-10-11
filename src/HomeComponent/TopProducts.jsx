import { useState } from 'react';
import { Link } from 'react-router-dom'; 
import productsData from '../data/productsData';

const TopProducts = () => {
    const [category, setCategory] = useState("All");

    const filteredProducts = (category === "All")
        ? productsData : productsData.filter(product => product.category === category);

    const displayProductCards = filteredProducts.slice(0,10);
    return (
        <div className="container">
            <div className="d-flex justify-content-center mb-4">
                <button className="btn btn-danger mx-2" onClick={() => setCategory("All")}>All</button>
                <button className="btn btn-tranparent text-white mx-2" onClick={() => setCategory("Headphones")}>Headphones</button>
                <button className="btn btn-tranparent text-white mx-2" onClick={() => setCategory("Earbuds")}>Earbuds</button>
                <button className="btn btn-tranparent text-white mx-2" onClick={() => setCategory("Earphones")}>Earphones</button>
                <button className="btn btn-tranparent text-white mx-2" onClick={() => setCategory("Neckbands")}>Neckbands</button>
            </div>
            <div className="d-flex flex-wrap justify-content-center">
                {displayProductCards.map(product => (
                    <div className="card p-3 h-50 w-50 text-center" key={product.id} style={{ flex: "0 1 25%", margin: "10px", background: "#161717", color: "white", borderRadius: "8px" }}>
                        <img src={product.images[0]} alt={product.title} className="img-fluid mb-2" style={{ height: '100px', objectFit: 'contain' }} />
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '10px' }}>
                            {[...Array(product.rateCount)].map((index) => (
                                <span key={index} className="text-danger"><i class="fa-solid fa-star"></i></span>
                            ))}
                        </div>
                        <h5>{product.title}</h5>
                        <h6>{product.info}</h6>
                        <pre>${product.finalPrice}     <span className='discount'>${product.originalPrice}</span></pre>
                        <button className='text-white'>Add to Cart</button>
                    </div>
                ))}

                <div className='browse-card p-2 text-center' style={{flex: "0 1 20%", margin: "10px", background: "#161717", color: "white", borderRadius: "8px"}}>
                    <Link to ="/ProductsPage" className='product-details'>Browse all Products in here</Link>
                       
                </div>
               
            </div>
        </div>
    );
};

export default TopProducts;
