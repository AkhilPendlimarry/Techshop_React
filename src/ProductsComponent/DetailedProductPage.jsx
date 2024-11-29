import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";  // Using useLocation to get passed data
import reviewsData from '../data/reviewsData';

const DetailedProductPage = () => {
  const navigate = useNavigate();
  const location = useLocation();  // Access the passed product data from the navigation state

  const [product, setProduct] = useState(null);  // Store the product data in state
  const [selectedImage, setSelectedImage] = useState("");  // Store the selected image
  const [reviews, setReviews] = useState([]);  // Store the reviews for the product

  useEffect(() => {
    if (location.state) {
      setProduct(location.state);  // Set product from passed state
      setSelectedImage(location.state.images[0]);  // Set the default selected image (first image)
      
      const productReviews = reviewsData.filter(review => review.productId === location.state.id);
      setReviews(productReviews);
    }
  }, [location.state]);  // Run when the product data is passed

  const handleBack = () => {
    navigate("/ProductsPage");  // Navigate back to products page
  };

  if (!product) {
    return <div>Loading...</div>;  // Show loading until product is available
  }

  return (
    <div className="container mt-5">
      {/* Back Button */}
      <button onClick={handleBack} className="btn btn-danger mb-4">Back to Products</button>

      <div className="row">
        {/* Column 1: All Product Images */}
        <div className="col-md-3">
          <h5>Product Images</h5>
          <div className="d-flex flex-column">
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

        {/* Column 2: Default Product Image */}
        <div className="col-md-3">
          <h5>Product Image</h5>
          <img
            src={selectedImage}
            alt="Selected Product"
            className="img-fluid"
            style={{ maxHeight: "400px", objectFit: "contain" }}
          />
        </div>

        {/* Column 3: Product Details */}
        <div className="col-md-6">
          <h3>{product.title}</h3>
          <p>{product.info}</p>
          <h4>${product.finalPrice} <span style={{ textDecoration: "line-through" }}>${product.originalPrice}</span></h4>
          <button className="btn btn-danger mt-3">Add to Cart</button>

          <h5 className="mt-4">Specifications</h5>
          <ul>
            <li><strong>Brand:</strong> {product.brand}</li>
            <li><strong>Category:</strong> {product.category}</li>
            <li><strong>Type:</strong> {product.type}</li>
            <li><strong>Connectivity:</strong> {product.connectivity}</li>
          </ul>

          <h5>Overview</h5>
          <p>{product.tagline}</p>

          <h5>Reviews</h5>
          {reviews.length > 0 ? (
            <div>
              {reviews.map((review) => (
                <div key={review.id} className="mb-3">
                  <strong>{review.name}</strong> ({review.date})
                  <p>{review.review}</p>
                  <div>
                    {[...Array(review.rateCount)].map((_, index) => (
                      <span key={index} className="text-warning">★</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No reviews yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailedProductPage;
