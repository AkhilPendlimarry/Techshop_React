import Carousel from 'react-bootstrap/Carousel';
import productsData from '../data/productsData';
import './HeroSection.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function HeroCarousel() {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  // Filter products to get only the hero-products
  const heroProducts = productsData.filter((product) => product.tag === "hero-product");
  
  const handleShopNow = (productId)=> {
    const selectedProduct = productsData.find((product)=> product.id === productId);
    navigate(`/DetailedProductPage/${productId}`, {state:selectedProduct}); // navifates to detailedProducts page and shows item based on product id.
  };

  const handleRadioChange=(index)=>{
    setActiveIndex(index);
  };

  return (
    <div className='hero-section'>
    <Carousel 
     activeIndex={activeIndex}
     onSelect={(selectedIndex)=>setActiveIndex(selectedIndex)}
     slide={true}
     controls={false} 
     pause={false} 
     interval={3000} 
     indicators={false}
     className='carousel-container'>
      {heroProducts.map((product) => (
        <Carousel.Item key={product.id}>
            <div className='carousel-content'>
              <div className='background-text'>{product.type}</div>
                <div className='carousel-text'>
                 <Carousel.Caption>
                    <h3>{product.title}</h3>
                    <p>{product.info}</p>
                    <pre> ${product.finalPrice}  <span className='discount'>${product.originalPrice}</span>  </pre>
                    <button className='shop-button' 
                     onClick={()=>handleShopNow(product.id)}>Shop Now</button>
                 </Carousel.Caption>
                </div>
                <img
                    className="d-block product-image"
                    src={product.heroImage}
                    alt={product.title}
                />
            </div> 
        </Carousel.Item>
      ))}
    </Carousel>

    {/* custom radio indicators */}
    <div className='carousel-indicators'>
      {heroProducts.map((_, index)=>(
        <label key={index} className='radio-indicator'>
          <input type='radio'
           name='carousel-indicator'
           checked={activeIndex === index}
           onChange={()=> handleRadioChange(index)}
           />
           <span className='custom-radio'></span>
        </label>
      ))}
    </div>
  </div>
  );
}

export default HeroCarousel;
