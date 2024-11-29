import React, {useState} from "react";
import Slider from "react-slick";
import productsData from '../data/productsData';
import './FeaturedProdCarousel.css';
import { useNavigate } from "react-router-dom";

const FeaturedProducts = () => {
  const navigate = useNavigate();
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const featuredProducts = productsData.filter(product => product.tag === "featured-product");
  const settings={
      dots: true,
      infinite: true,
      slidesToShow: 5,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 1500,
      pauseOnHover: true,
      arrows: false,
    };
    const handleMouseEnter = (index) => {
      setHoveredIndex(index);
    };

    const handleMouseLeave = () => {
        setHoveredIndex(null);
    };

    const handleProductClick=(productId)=>{
      const selectedProduct = productsData.find((product)=> product.id === productId);
      navigate(`/DetailedProductPage/${productId}`, {state: selectedProduct});
    };

    return (
        <div className="slider-container">
           <Slider {...settings}>
              {featuredProducts.map((product, index) => (
                    <div className={`carousel-item-container ${hoveredIndex === index ? 'hovered' : ''} ${hoveredIndex === index - 1 || hoveredIndex === index + 1 ? 'adjacent' : ''}`}
                      key={product.id} 
                      onMouseEnter={() => handleMouseEnter(index)}
                      onMouseLeave={handleMouseLeave}
                      onClick={()=>handleProductClick(product.id)}
                    >
                        <div className="featured-item text-center">
                            
                            <img
                                src={product.images[0]}
                                alt={product.title}
                                className="carousel-image"
                            />
                            <h5 className="mt-3">{product.title}</h5>
                            <pre>${product.finalPrice}  <span className="discount">${product.originalPrice} </span></pre>
                        </div>
                    </div>
            ))}
           </Slider>
        </div>
    );
};

 export default FeaturedProducts;
