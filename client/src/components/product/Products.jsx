import React, { useState, useEffect, useContext } from 'react';
import { CartContext } from '../cart/Cartcontext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './products.css';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { cartItems, addToCart, removeFromCart } = useContext(CartContext);

  useEffect(() => {
    getProducts();
  }, []);

  async function getProducts() {
    try {
      const response = await fetch('http://localhost:8082/products');
      if (!response.ok) {
        throw new Error('Failed to fetch products.');
      }
      const data = await response.json();
      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setError(true);
      setLoading(false);
    }
  }

  const addtocarttoast = () => toast.success('Item added successfully!');
  const removefromcarttoast = () => toast.error('Item removed from cart!');

  const isInCart = (productId) => {
    return cartItems.some((item) => item.product_id === productId);
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
      return ((price - salePrice) / price) * 100;
    }
    return 0;
  };

  return (
    <div className='products'>
      {loading ? (
        <div className='loader'>Loading...</div>
      ) : error ? (
        <div className='error-message'>sorry check back later</div>
      ) : (
        <div className='products-container'>
          {products.map((product) => (
            <div key={product.ProductID} className='product-content'>
              <img src={product.ProductImage} alt={product.ProductName} className='product-image' />
              <div className='product-description'>
                <h1 className='product-title'>{product.ProductName}</h1>
                <p className='product-dec'>{product.Description}</p>
                <p className='product-price'>
                  {product.SalePrice ? (
                    <>
                      <span className='original-price'>Price: ${product.Price}</span>
                      {' | '}
                      Sale Price: ${product.SalePrice}
                    </>
                  ) : (
                    `Price: $${product.Price}`
                  )}
                </p>
                {product.SalePrice && (
                  <p className='product-discount'>
                    Discount: {calculateDiscount(product.Price, product.SalePrice).toFixed(2)}%
                  </p>
                )}
              </div>
              <div className='product-addbutton'>
                <button
                  className={`buttonadd ${isInCart(product.ProductID) ? 'remove' : 'add'}`}
                  onClick={() => handleCartButton(product)}
                >
                  {isInCart(product.ProductID) ? 'Remove from cart' : 'Add to cart'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      <ToastContainer />
    </div>
  );
}
