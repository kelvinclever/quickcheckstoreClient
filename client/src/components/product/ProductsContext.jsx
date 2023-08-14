import React, { createContext, useState, useContext, useEffect } from 'react';

const ProductContext = createContext();

export function useProductContext() {
  return useContext(ProductContext);
}

export function ProductProvider({ children, apiurl }) {

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

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
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setError(true);
      setLoading(false);
    }
  }

  return (
    <ProductContext.Provider value={{ products, setProducts, filteredProducts, setFilteredProducts, loading, error }}>
      {children}
    </ProductContext.Provider>
  );
}
