import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useProductContext } from './ProductsContext.jsx';
import { CartContext } from '../cart/Cartcontext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './products.css';
import Loader from './Loader.jsx';

export default function Products({ apiurl }) {
  const { products, setProducts, filteredProducts, setFilteredProducts, loading, error } = useProductContext();
  const { cartItems, addToCart, removeFromCart } = useContext(CartContext);
  
  const addtocarttoast = () => toast.success('Item added successfully!');
  const removefromcarttoast = () => toast.error('Item removed from cart!');

  const isInCart = (productId) => {
    return cartItems.some((item) => item.product_id === productId);
  };

  useEffect(() => {
    getProducts();
  }, []);

  async function getProducts() {
    try {
      const response = await fetch(apiurl);
      if (!response.ok) {
        throw new Error('Failed to fetch products.');
      }
      const data = await response.json();
      setProducts(data);
      
    } catch (error) {
      console.error('Error fetching products:', error);
      
    }
  }
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

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  return (
    <div className='products'>
      {loading ? (
        <div className='loader'><Loader/></div>
      ) : error ? (
        <div className='error-message'><Loader/></div>
      ) : (
        <div className='products-container'>
          {filteredProducts.length === 0 ? (
            <div className='no-products-message'>No products found with the given name.</div>
          ) : (
            filteredProducts.map((product) => (
           
              <div key={product.ProductID} className='product-content'>
                <Link to={`/products/${product.ProductID}`} className='product-link'> 
                <img src={product.ProductImage} alt={product.ProductName} className='product-image' />
                </Link>  
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
            ))
          
          )}
        </div>
     
      )}
      <ToastContainer />
    </div>
    
  );
}
