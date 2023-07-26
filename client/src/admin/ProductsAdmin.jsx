import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './productsadmin.css';

export default function ProductsAdmin() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [newProduct, setNewProduct] = useState({
    ProductName: '',
    Description: '',
    Price: 0,
    SalePrice: 0,
    StockQuantity: 0,
    ProductImage: '',
    BrandName: '',
    CategoryName: '',
    Size: '',
    Color: '',
    PriceAdjustment: '',
  });

  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    // Filter the products whenever the searchTerm changes
    const filteredProducts = products.filter((product) =>
      product.ProductName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filteredProducts);
  }, [products, searchTerm]);

  async function getProducts() {
    try {
      const response = await fetch('http://localhost:8082/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }

  const deleteProduct = async (productId) => {
    try {
      await fetch(`http://localhost:8082/products/${productId}/delete`, {
        method: 'DELETE',
      });

      // Update the products state by removing the deleted product
      setProducts((prevProducts) => prevProducts.filter((product) => product.ProductID !== productId));

      // Update the filteredProducts state as well by removing the deleted product
      setFilteredProducts((prevFilteredProducts) =>
        prevFilteredProducts.filter((product) => product.ProductID !== productId)
      );

      toast.success('Product deleted successfully!');
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const editProduct = (productId) => {
    const productToEdit = products.find((product) => product.ProductID === productId);
    setNewProduct(productToEdit);
  };

  const searchProducts = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  const addProduct = async () => {
    try {
      const response = await fetch('http://localhost:8082/products/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });

      if (response.ok) {
        toast.success('Product added successfully!');
        setNewProduct({
          ProductName: '',
          Description: '',
          Price: 0,
          SalePrice: 0,
          StockQuantity: 0,
          ProductImage: '',
          BrandName: '',
          CategoryName: '',
          Size: '',
          Color: '',
          PriceAdjustment: '',
        });
        getProducts(); // Refresh the product list after adding a new product
      } else {
        const error = await response.json();
        toast.error(`Failed to add product: ${error.error}`);
      }
    } catch (error) {
      console.error('Error adding product:', error);
      toast.error('Failed to add product.');
    }
  };

  const handleNewProductChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  return (
    <div className='products'>
      <div className='products-nav'>
        <h1>Admin Panel</h1>
        <div className='search-container'>
          <input
            type='text'
            placeholder='Search products'
            value={searchTerm}
            onChange={(e) => searchProducts(e.target.value)}
          />
        </div>
        <button className='add-button' onClick={() => setNewProduct({})}>
          Add
        </button>
      </div>
      <div className='products-content'>
        {Object.keys(newProduct).length > 0 && (
          <div className='product-form'>
            <h2>{newProduct.ProductID ? 'Edit Product' : 'Add Product'}</h2>
            <form>
              <label>Product Name:</label>
              <input
                type='text'
                name='ProductName'
                value={newProduct.ProductName}
                onChange={handleNewProductChange}
              />

              {/* Add other input fields for product properties */}

              <button type='button' onClick={addProduct}>
                {newProduct.ProductID ? 'Update' : 'Add'}
              </button>
            </form>
          </div>
        )}

        {filteredProducts.length === 0 && searchTerm ? (
          <div className='no-products'>No products found.</div>
        ) : (
          <table>
            <thead>
              <tr>
                {/* Add table headers for product properties */}
                <th>Product ID</th>
                <th>Product Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Sale Price</th>
                <th>Stock Quantity</th>
                <th>Product Image</th>
                <th>Brand Name</th>
                <th>Category Name</th>
                <th>Size</th>
                <th>Color</th>
                <th>Price Adjustment</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.ProductID}>
                  {/* Add table data for product properties */}
                  <td>{product.ProductID}</td>
                  <td>{product.ProductName}</td>
                  <td>{product.Description}</td>
                  <td>${product.Price}</td>
                  <td>${product.SalePrice || 'N/A'}</td>
                  <td>{product.StockQuantity}</td>
                  <td>{product.ProductImage}</td>
                  <td>{product.BrandName}</td>
                  <td>{product.CategoryName}</td>
                  <td>{product.Size}</td>
                  <td>{product.Color}</td>
                  <td>{product.PriceAdjustment}</td>
                  <td>
                    <button className='edit-button' onClick={() => editProduct(product.ProductID)}>
                      Edit
                    </button>
                    <button className='delete-button' onClick={() => deleteProduct(product.ProductID)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}
