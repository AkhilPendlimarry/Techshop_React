import Carousel from 'react-bootstrap/Carousel';
import productsData from '../data/productsData';
import './HeroSection.css';

function HeroCarousel() {
  // Filter products to get only the hero-products
  const heroProducts = productsData.filter((product) => product.tag === "hero-product");

  return (
    <div className='hero-section'>
    <Carousel slide={true} controls={false} pause={false} interval={3000} className='carousel-container'>
      {heroProducts.map((product) => (
        <Carousel.Item key={product.id}>
            <div className='carousel-content'>
              <div className='background-text'>{product.type}</div>
                <div className='carousel-text'>
                 <Carousel.Caption>
                    <h3>{product.title}</h3>
                    <p>{product.info}</p>
                    <pre> ${product.finalPrice}  <span className='discount'>${product.originalPrice}</span>  </pre>
                    <button className='shop-button'>Shop Now</button>
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
  </div>
  );
}

export default HeroCarousel;
