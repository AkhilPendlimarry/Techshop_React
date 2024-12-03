import React, { useEffect, useState } from "react";
import { useCart } from './cartContext';
import { useNavigate, useLocation } from "react-router-dom";  // Using useLocation to get passed data
import reviewsData from '../data/reviewsData';
import productsData from "../data/productsData";
import Header from "../HomeComponent/Header";
import Footer from "../HomeComponent/Footer";

const DetailedProductPage = () => {
  const navigate = useNavigate();
  const location = useLocation();  // Access the passed product data from the navigation state
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);  // Store the product data in state
  const [selectedImage, setSelectedImage] = useState("");  // Store the selected image
  // const [reviews, setReviews] = useState([]);  // Store the reviews for the product
  const [relatedProducts, setRealatedProducts] = useState([]);
  const [activeSection, setActiveSection] = useState('specifications');

  useEffect(() => {
    if (location.state) {
      const currentProduct = location.state;
      setProduct(currentProduct);  // Set product from passed state
      setSelectedImage(currentProduct.images[0]);  // Set the default selected image (first image)
      
      // const productReviews = reviewsData.filter((review) => review.id === location.state.id);
      // setReviews(productReviews);

      const related = productsData.filter(
        (item)=> item.category === currentProduct.category && item.id !== currentProduct.id);
      setRealatedProducts(related);
    }
  }, [location.state]);  // Run when the product data is passed

  const handleBack = () => {
    navigate("/ProductsPage");  // Navigate back to products page
  };

  if (!product) {
    return <div className="text-center my-5">Loading product details...</div>;  // Shows loading until product is available
  }

  return (
    <div>
      <Header/>
      <div className="container mt-5">
      {/* Back Button */}
      <button onClick={handleBack} className="btn btn-danger mb-4"><i className="fa-solid fa-arrow-left"></i></button>

      <div className="row">
        {/* Column 1: All Product Images */}
        <div className="col-md-2 ">
        <div className="image-list-container">
          {/* <h5>Product Images</h5> */}
          <div className="d-flex flex-column ">
            {product.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${product.title} - ${index + 1}`}
                className="img-fluid mb-2"
                style={{ cursor: "pointer" }}
                onClick={() => setSelectedImage(image)}
              />
            ))}
          </div>
        </div>
        </div>

        {/* Column 2: Default Product Image */}
        <div className="col-md-6">
        <div className="main-image-container">
          {/* <h5>Product Image</h5> */}
          <img
            src={selectedImage}
            alt="Selected Product"
            className="img-fluid"
          />
        </div>
        </div>

        {/* Column 3: Product Details */}
         <div className="col-md-4">
          <div className="product-details-container">
            <h3>{product.title}</h3>
            <p>{product.info}</p>
            <div style={{ display: "flex", alignItems: "center", marginBottom: "15px" }}>
              <div>
                {[...Array(5)].map((_, index) => (
                  <span className="text-danger">
                    <i className="fa-solid fa-star"></i>
                  </span> 
                ))}
              </div>
              <span style={{ marginLeft: "10px", fontSize: "14px", color: "#666" }}>
                {product.ratings} Ratings
              </span>
            </div>
            <hr />
            <div className="d-flex justify-content-between">
            <h4>${product.finalPrice} <span style={{ textDecoration: "line-through", fontSize:"16px"
             }}>${product.originalPrice}</span></h4>
             <button className="btn btn-success"> <i class="fa-solid fa-check"></i>In Stock</button></div>
            <hr />
            <p>Offers & Discounts</p>
                <div className="optionsButtons">
                  <button type="button" className="btn btn-outline-secondary">No Cost EMI on Credit Card</button>  
                  <button type="button" className="btn btn-outline-secondary">Pay Later & Avail Cashback</button>
                </div> 
                 <br />
                 <hr />
            <button className='btn btn-danger mt-2' onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
         </div>
        </div>

        <div className="row mb-4">
          <div className="col-12">
            <div className="d-flex justify-content-center">
              <h5
                onClick={() => setActiveSection("Specifications")}
                className={`me-4 ${
                  activeSection === "Specifications" ? "text-danger" : ""
                }`}
                style={{ cursor: "pointer" }}
              >
                Specifications
              </h5>
              <h5
                onClick={() => setActiveSection("Overview")}
                className={`me-4 ${
                  activeSection === "Overview" ? "text-danger" : ""
                }`}
                style={{ cursor: "pointer" }}
              >
                Overview
              </h5>
              <h5
                onClick={() => setActiveSection("Reviews")}
                className={`me-4 ${
                  activeSection === "Reviews" ? "text-danger" : ""
                }`}
                style={{ cursor: "pointer" }}
              >
                Reviews
              </h5>
            </div>
          </div>
        </div>

        {/* Conditional Content Rendering */}
        <div className="row">
          {activeSection === "Specifications" && (
            <div className="col-12 ">
              <ul className="list">
                <li>
                  <strong>Brand:</strong> {product.brand}
                </li>
                <li>
                  <strong>Model:</strong> {product.title}
                </li>
                <li>
                  <strong>Generic Name:</strong> {product.category}
                </li>
                <li>
                  <strong>Headphone Type:</strong> {product.type}
                </li>
                <li>
                  <strong>Connectivity:</strong> {product.connectivity}
                </li>

              </ul>
            </div>
          )}
          {activeSection === "Overview" && (
            <div className="col-12 list ">
              
              <h3>The {product.title} offers fabulous sound quality.</h3>
              <ul>
                <li>Sound tuned to perfection</li>
                <li>Comfortable to wear</li>
                <li>Long hours playback time</li>
              </ul>
              
              <p>Buy the {product.info} which offers you with fabulous music experience by providing with aweseom sound quality that you can never move on from.</p>
            </div>
          )}
          {activeSection === "Reviews" && (
            <div className="col-12 list">
              
              {reviewsData.length > 0 ? (
                reviewsData.map((review) => (
                  <div key={review.id} className="mb-3">
                    <strong>{review.name}</strong> 
                    <p>{review.review}</p>
                    <div>
                      {[...Array(review.rateCount)].map((_, index) => (
                        <span key={index} className="text-danger">
                          <i className="fa-solid fa-star"></i>
                        </span>
                      ))}
                      {review.date}
                    </div>
                  </div>
                ))
              ) : (
                <p>No reviews yet.</p>
              )}
            </div>
          )}
        </div>


        {/* Related Products */}
        <div className="mt-5">
          <h4>Related Products</h4>
          <div className="d-flex flex-wrap">
            {relatedProducts.length > 0 ?(    relatedProducts.map((item) => (
              <div
                key={item.id}
                className="card p-2 me-2 mb-3"
                style={{
                  flex: "0 1 20%",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  background: "transparent",
                  margin: "20px"
                }}
                onClick={() =>
                  navigate(`/DetailedProductPage/${item.id}`, { state: item })
                }>
              
                <img
                  src={item.images[0]}
                  alt={item.title}
                  className="img-fluid mb-2"
                  style={{ height: "150px", objectFit: "contain" }}
                />
                <h6 style={{ color:"whitesmoke" }}>{item.title}</h6>
                <p className="text-danger">
                  ${item.finalPrice}{" "}
                  <span style={{ color:"grey",
                    fontSize:"14px"
                   }}>
                    ${item.originalPrice}
                  </span>
                </p>
              </div>
            ))):( <p>No related products available.</p>)}
          </div>
        </div>
       </div>
    <Footer />
  </div>
         
    
  );
};

export default DetailedProductPage;

