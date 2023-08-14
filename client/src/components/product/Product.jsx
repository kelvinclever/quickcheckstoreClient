import React from 'react';
import { useParams } from 'react-router-dom';
import { useProductContext } from './ProductsContext.jsx';

export default function ProductDetails() {
  const { productId } = useParams();
  const { products } = useProductContext();

  const product = products.find((product) => product.ProductID === parseInt(productId));
  if (!product) {
    return <div className='error-message'>Product not found.</div>;
  }

  return (
    <div className='product-details'>
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
      </div>
    </div>
  );
}
