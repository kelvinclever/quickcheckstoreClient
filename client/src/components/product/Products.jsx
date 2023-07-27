import React, { useEffect, useContext } from 'react';
import { useProductContext } from './ProductsContext.jsx';
import { CartContext } from '../cart/Cartcontext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './products.css';

export default function Products({ apiurl }) {
  const { products, setProducts, filteredProducts, setFilteredProducts, loading, error } = useProductContext();
  const { cartItems, addToCart, removeFromCart } = useContext(CartContext);

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

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  return (
    <div className='products'>
      {loading ? (
        <div className='loader'>Loading...</div>
      ) : error ? (
        <div className='error-message'>Sorry, check back later</div>
      ) : (
        <div className='products-container'>
          {filteredProducts.length === 0 ? (
            <div className='no-products-message'>No products found with the given name.</div>
          ) : (
            filteredProducts.map((product) => (
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
            ))
          )}
        </div>
      )}
      <ToastContainer />
    </div>
  );
}
