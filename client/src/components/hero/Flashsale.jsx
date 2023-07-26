import React, { useState, useEffect, useContext } from 'react';
import './bestprice.css';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { CartContext } from '../cart/Cartcontext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Bestprice = (props) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { cartItems, addToCart, removeFromCart, increaseItem, decreaseItem } = useContext(CartContext);
  const addtocarttoast = () => toast.success('Item added to cart!');
  const removefromcarttoast = () => toast.error('Item removed from cart!');

  const isInCart = (productId) => {
    return cartItems.some((item) => item.ProductID === productId);
  };

  const handleCartButton = (product) => {
    if (isInCart(product.ProductID)) {
      removeFromCart(product);
      removefromcarttoast();
    } else {
      addToCart(product);
      addtocarttoast();
    }
  };

  const calculateDiscount = (price, salePrice) => {
    if (salePrice && salePrice < price) {
      return Math.round(((price - salePrice) / price) * 100);
    }
    return 0;
  };

  useEffect(() => {
    setLoading(true);
    // Fetch data from the API endpoint
    fetch('http://localhost:8082/products/ondiscount/products')
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  return (
    <div>
      {loading ? (
        <div className="loader-container">
          <div className="loader" />
        </div>
      ) : (
        <Carousel
          swipeable={false}
          draggable={false}
          showDots={true}
          responsive={responsive}
          ssr={true}
          slidesToSlide={2}
          infinite={true}
          autoPlay={props.deviceType !== 'mobile' ? true : false}
          autoPlaySpeed={1000}
          keyBoardControl={true}
          customTransition="all .5"
          transitionDuration={500}
          containerClass="carousel-container"
          removeArrowOnDeviceType={['tablet', 'mobile']}
          deviceType={props.deviceType}
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px"
        >
          {products.map((product) => (
            <div key={product.ProductID} className="product-card">
              <div className="product-image">
                <img src={product.ProductImage} alt="" />
              </div>
              <div className="product-details">
                <h3>{product.ProductName}</h3>
                <p>{product.Description}</p>
                <p className="product-price">
                  Original: ${product.Price}
                  {product.SalePrice && (
                    <span className="product-discount">
                      -{calculateDiscount(product.Price, product.SalePrice)}%
                    </span>
                  )}
                </p>
                <div className="product-actions">
                  <button
                    className={`buttonadd ${isInCart(product.ProductID) ? 'remove' : 'add'}`}
                    onClick={() => handleCartButton(product)}
                  >
                    {isInCart(product.ProductID) ? 'Remove from cart' : 'Add to cart'}
                  </button>
                  {isInCart(product.ProductID) && (
                    <div className="quantity-controls">
                      <button onClick={() => decreaseItem(product)}>
                        <i className="fas fa-minus"></i>
                      </button>
                      <span>{cartItems.find((item) => item.ProductID === product.ProductID).quantity}</span>
                      <button onClick={() => increaseItem(product)}>
                        <i className="fas fa-plus"></i>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      )}
      <ToastContainer />
    </div>
  );
};

export default Bestprice;
