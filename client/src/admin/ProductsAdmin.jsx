import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './productsadmin.css';

export default function ProductsAdmin() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [newProduct, setNewProduct] = useState({
    ProductID: null,
    ProductName: '',
    Description: '',
    Price: '',
    SalePrice: '',
    ProductImage: '',
    BrandName: '',
    CategoryName: '',
    Size: '',
    Color: '',
    StockQuantity: '',
    PriceAdjustment: '',
  });
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Pagination variables
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const totalProducts = filteredProducts.length;
  const totalPages = Math.ceil(totalProducts / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  useEffect(() => {
    getProducts();
  }, []);

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
      setProducts((prevProducts) => prevProducts.filter((product) => product.ProductID !== productId));
      toast.success('Product deleted successfully!');
      getProducts();
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
    const filteredProducts = products.filter((product) =>
      product.ProductName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filteredProducts);
  };

  const addProduct = async () => {
    try {
      let response;
      if (newProduct.ProductID) {
        // If ProductID exists, update the existing product
        response = await fetch(`http://localhost:8082/products/${newProduct.ProductID}/update`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newProduct),
        });
      } else {
        // Otherwise, add a new product
        response = await fetch('http://localhost:8082/products/new', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newProduct),
        });
      }

      if (response.ok) {
        const data = await response.json();
        if (newProduct.ProductID) {
          // If product was updated, update the products array with the updated product
          setProducts((prevProducts) =>
            prevProducts.map((product) =>
              product.ProductID === newProduct.ProductID ? data : product
            )
          );
          toast.success('Product updated successfully!');
        } else {
          // If new product was added, add it to the products array
          setProducts((prevProducts) => [...prevProducts, data]);
          toast.success('Product added successfully!');
        }
        setNewProduct({
          ProductID: null,
          ProductName: '',
          Description: '',
          Price: '',
          SalePrice: '',
          ProductImage: '',
          BrandName: '',
          CategoryName: '',
          Size: '',
          Color: '',
          StockQuantity: '',
          PriceAdjustment: '',
        });
      } else {
        toast.error('Failed to add/update product');
      }
    } catch (error) {
      console.error('Error adding/updating product:', error);
    }
  };

  const handleNewProductChange = (e) => {
    e.preventDefault();
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [e.target.name]: e.target.value,
    }));
  };

  // Helper function to change the current page
  const handlePageChange = (page) => {
    setCurrentPage(page);
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
      </div>
      <div className='products-container'>
        <div className='new-product-form'>
          <input
            type='text'
            name='ProductName'
            placeholder='Name'
            value={newProduct.ProductName}
            onChange={handleNewProductChange}
          />
          <input
            type='text'
            name='Description'
            placeholder='Description'
            value={newProduct.Description}
            onChange={handleNewProductChange}
          />
          <input
            type='number'
            name='Price'
            placeholder='Price'
            value={newProduct.Price}
            onChange={handleNewProductChange}
          />
          <input
            type='text'
            name='ProductImage'
            placeholder='Image Path'
            value={newProduct.ProductImage}
            onChange={handleNewProductChange}
          />
          <button className='add-button' onClick={addProduct}>
            {newProduct.ProductID ? 'Update Product' : 'Add New Product'}
          </button>
        </div>
      </div>
      <div className='products_content'>
        {currentProducts.length === 0 && searchTerm ? (
          <div className='no-products'>No products found.</div>
        ) : (
          <table>
            <thead>
              <tr>
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
              {currentProducts.map((product) => (
                <tr key={product.ProductID}>
                  <td>{product.ProductID}</td>
                  <td>{product.ProductName}</td>
                  <td>{product.Description}</td>
                  <td>${product.Price}</td>
                  <td>${product.SalePrice || 'N/A'}</td>
                  <td>{product.StockQuantity}</td>
                  <td>{product.ProductImage}</td>
                  <td>{product.BrandName}</td>
                  <td>{product.CategoryName}</td>
               
                  <td>
        {product.Variations
          .filter((variation) => variation.VariationName === 'Size')
          .map((variation) => variation.VariationValues.AttributeValue)
          .join(', ') || "no size provided"}
      </td>
      <td>
        {product.Variations
          .filter((variation) => variation.VariationName === 'Color')
          .map((variation) => variation.VariationValues.AttributeValue)
          .join(', ')|| "no color provided"}
      </td>
      <td>
        {product.Variations
          .filter((variation) => variation.VariationName === 'Color')
          .map((variation) => variation.StockQuantity)
          .join(', ') || "no price for variation"}
      </td>
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

        {totalProducts > itemsPerPage && (
          <div className='pagination'>
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index + 1}
                className={`page-btn ${currentPage === index + 1 ? 'active' : ''}`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}
