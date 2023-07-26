import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './productsadmin.css';

export default function ProductsAdmin() {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [productName, setProductName] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [productImage, setProductImage] = useState('');
  const [price, setPrice] = useState('');
  const [salePrice, setSalePrice] = useState('');
  const [stockQuantity, setStockQuantity] = useState('');
  const [variations, setVariations] = useState([
    {
      variationName: '',
      priceAdjustment: '',
      variationValues: [
        {
          attributeName: '',
          attributeValue: '',
        },
      ],
    },
  ]);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Prepare the product data to be sent to the server for addition
    const productData = {
      name: productName,
      brand,
      category,
      description,
      price,
      salePrice,
      stockQuantity,
      images: productImage,
      variations,
    };

    // Send the product data to the server using an API call (e.g., fetch, axios, etc.)
    // Make sure to replace 'API_ENDPOINT' with the actual API endpoint for adding products
    fetch('http://localhost:8082/products/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the server, e.g., show success message, clear form, etc.
        console.log(data.message); // Assuming the server returns a message field for success
        // Clear the form fields after successful submission
        setProductName('');
        setBrand('');
        setCategory('');
        setDescription('');
        setProductImage('');
        setPrice('');
        setSalePrice('');
        setStockQuantity('');
        setVariations([
          {
            variationName: '',
            priceAdjustment: '',
            variationValues: [
              {
                attributeName: '',
                attributeValue: '',
              },
            ],
          },
        ]);
        toast.success('Product added successfully!');
      })
      .catch((error) => {
        // Handle error, e.g., show error message to the user
        console.error('Error adding product:', error);
        toast.error('Error adding product. Please try again.');
      });
  };

  const handleAddVariation = () => {
    setVariations([
      ...variations,
      {
        variationName: '',
        priceAdjustment: '',
        variationValues: [
          {
            attributeName: '',
            attributeValue: '',
          },
        ],
      },
    ]);
  };

  const handleRemoveVariation = (index) => {
    const updatedVariations = [...variations];
    updatedVariations.splice(index, 1);
    setVariations(updatedVariations);
  };

  const handleVariationChange = (index, field, value) => {
    const updatedVariations = [...variations];
    updatedVariations[index][field] = value;
    setVariations(updatedVariations);
  };

  const handleVariationValueChange = (variationIndex, valueIndex, field, value) => {
    const updatedVariations = [...variations];
    updatedVariations[variationIndex].variationValues[valueIndex][field] = value;
    setVariations(updatedVariations);
  };

  const handleImageUrlChange = (url) => {
    setProductImage(url);
  };

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
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.ProductID !== productId)
      );

      // Update the filteredProducts state as well by removing the deleted product
      setFilteredProducts((prevFilteredProducts) =>
        prevFilteredProducts.filter((product) => product.ProductID !== productId)
      );

      toast.success('Product deleted successfully!');
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Error deleting product. Please try again.');
    }
  };

  const editProduct = (productId) => {
    const productToEdit = products.find((product) => product.ProductID === productId);
    // Assuming you have a 'setProduct' function for editing product
    // For now, we'll use 'setProduct' directly to set the values in the form
    setProductName(productToEdit.ProductName);
    setBrand(productToEdit.Brand);
    setCategory(productToEdit.Category);
    setDescription(productToEdit.Description);
    setProductImage(productToEdit.ProductImage);
    setPrice(productToEdit.Price);
    setSalePrice(productToEdit.SalePrice);
    setStockQuantity(productToEdit.StockQuantity);
    setVariations(productToEdit.Variations);
  };

  const searchProducts = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  const handleNewProductChange = (e) => {
    const { name, value } = e.target;
    // Update the respective state variable based on the input field's 'name' attribute
    switch (name) {
      case 'productName':
        setProductName(value);
        break;
      case 'brand':
        setBrand(value);
        break;
      case 'category':
        setCategory(value);
        break;
      case 'description':
        setDescription(value);
        break;
      case 'productImage':
        setProductImage(value);
        break;
      case 'price':
        setPrice(value);
        break;
      case 'salePrice':
        setSalePrice(value);
        break;
      case 'stockQuantity':
        setStockQuantity(value);
        break;
      default:
        break;
    }
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
      <div className='products-content'>
        <div className='product-form'>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Product Name:</label>
              <input
                type='text'
                name='productName'
                value={productName}
                onChange={handleNewProductChange}
              />
            </div>
            <div>
              <label>Brand:</label>
              <input
                type='text'
                name='brand'
                value={brand}
                onChange={handleNewProductChange}
              />
            </div>
            <div>
              <label>Category:</label>
              <input
                type='text'
                name='category'
                value={category}
                onChange={handleNewProductChange}
              />
            </div>
            <div>
              <label>Description:</label>
              <textarea
                name='description'
                value={description}
                onChange={handleNewProductChange}
              />
            </div>
            <div>
              <label>Product Image:</label>
              <input
                type='text'
                name='productImage'
                value={productImage}
                onChange={handleNewProductChange}
              />
            </div>
            {productImage && (
              <div>
                <label>Image Preview:</label>
                <img
                  src={productImage}
                  alt='Product Preview'
                  style={{ width: '200px', height: '200px' }}
                />
              </div>
            )}
            <div>
              <label>Price:</label>
              <input
                type='number'
                name='price'
                value={price}
                onChange={handleNewProductChange}
              />
            </div>
            <div>
              <label>Sale Price:</label>
              <input
                type='number'
                name='salePrice'
                value={salePrice}
                onChange={handleNewProductChange}
              />
            </div>
            <div>
              <label>Stock Quantity:</label>
              <input
                type='number'
                name='stockQuantity'
                value={stockQuantity}
                onChange={handleNewProductChange}
              />
            </div>
            <div>
              <h2>Variations:</h2>
              {variations.map((variation, index) => (
                <div key={index}>
                  <div>
                    <label>Variation Name:</label>
                    <input
                      type='text'
                      value={variation.variationName}
                      onChange={(e) =>
                        handleVariationChange(index, 'variationName', e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <label>Price Adjustment:</label>
                    <input
                      type='number'
                      value={variation.priceAdjustment}
                      onChange={(e) =>
                        handleVariationChange(index, 'priceAdjustment', e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <h3>Variation Values:</h3>
                    {variation.variationValues.map((value, valueIndex) => (
                      <div key={valueIndex}>
                        <div>
                          <label>Attribute Name:</label>
                          <input
                            type='text'
                            value={value.attributeName}
                            onChange={(e) =>
                              handleVariationValueChange(
                                index,
                                valueIndex,
                                'attributeName',
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <div>
                          <label>Attribute Value:</label>
                          <input
                            type='text'
                            value={value.attributeValue}
                            onChange={(e) =>
                              handleVariationValueChange(
                                index,
                                valueIndex,
                                'attributeValue',
                                e.target.value
                              )
                            }
                          />
                        </div>
                      </div>
                    ))}
                    <button
                      type='button'
                      onClick={() =>
                        setVariations([
                          ...variations.slice(0, index + 1),
                          {
                            variationName: '',
                            priceAdjustment: '',
                            variationValues: [
                              {
                                attributeName: '',
                                attributeValue: '',
                              },
                            ],
                          },
                          ...variations.slice(index + 1),
                        ])
                      }
                    >
                      Add Value
                    </button>
                    <button
                      type='button'
                      onClick={() => handleRemoveVariation(index)}
                    >
                      Remove Variation
                    </button>
                  </div>
                </div>
              ))}
              <button type='button' onClick={handleAddVariation}>
                Add Variation
              </button>
            </div>
            <button type='submit'>Add Product</button>
          </form>
        </div>

        {filteredProducts.length === 0 && searchTerm ? (
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
              {filteredProducts.map((product) => (
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
