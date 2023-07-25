import React, { useState } from "react";
import ImageUploader from "./ImageUploader.jsx"; 

const AddProductForm = () => {
  const [productName, setProductName] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [productImage, setProductImage] = useState("");
  const [price, setPrice] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [stockQuantity, setStockQuantity] = useState("");
  const [variations, setVariations] = useState([
    {
      variationName: "",
      priceAdjustment: "",
      variationValues: [
        {
          attributeName: "",
          attributeValue: "",
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
    fetch("http://localhost:8082/products/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the server, e.g., show success message, clear form, etc.
        console.log(data.message); // Assuming the server returns a message field for success
        // Clear the form fields after successful submission
        setProductName("");
        setBrand("");
        setCategory("");
        setDescription("");
        setProductImage("");
        setPrice("");
        setSalePrice("");
        setStockQuantity("");
        setVariations([
          {
            variationName: "",
            priceAdjustment: "",
            variationValues: [
              {
                attributeName: "",
                attributeValue: "",
              },
            ],
          },
        ]);
      })
      .catch((error) => {
        // Handle error, e.g., show error message to the user
        console.error("Error adding product:", error);
      });
  };

  const handleAddVariation = () => {
    setVariations([
      ...variations,
      {
        variationName: "",
        priceAdjustment: "",
        variationValues: [
          {
            attributeName: "",
            attributeValue: "",
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

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Product Name:</label>
        <input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
      </div>
      <div>
        <label>Brand:</label>
        <input
          type="text"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        />
      </div>
      <div>
        <label>Category:</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </div>
      <div>
        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <label>Product Image:</label>
        <ImageUploader onChange={handleImageUrlChange} />
      </div>
      {productImage && (
        <div>
          <label>Image Preview:</label>
          <img
            src={productImage}
            alt="Product Preview"
            style={{ width: "200px", height: "200px" }}
          />
        </div>
      )}
      <div>
        <label>Price:</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      <div>
        <label>Sale Price:</label>
        <input
          type="number"
          value={salePrice}
          onChange={(e) => setSalePrice(e.target.value)}
        />
      </div>
      <div>
        <label>Stock Quantity:</label>
        <input
          type="number"
          value={stockQuantity}
          onChange={(e) => setStockQuantity(e.target.value)}
        />
      </div>
      <div>
        <h2>Variations:</h2>
        {variations.map((variation, index) => (
          <div key={index}>
            <div>
              <label>Variation Name:</label>
              <input
                type="text"
                value={variation.variationName}
                onChange={(e) =>
                  handleVariationChange(index, "variationName", e.target.value)
                }
              />
            </div>
            <div>
              <label>Price Adjustment:</label>
              <input
                type="number"
                value={variation.priceAdjustment}
                onChange={(e) =>
                  handleVariationChange(
                    index,
                    "priceAdjustment",
                    e.target.value
                  )
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
                      type="text"
                      value={value.attributeName}
                      onChange={(e) =>
                        handleVariationValueChange(
                          index,
                          valueIndex,
                          "attributeName",
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <div>
                    <label>Attribute Value:</label>
                    <input
                      type="text"
                      value={value.attributeValue}
                      onChange={(e) =>
                        handleVariationValueChange(
                          index,
                          valueIndex,
                          "attributeValue",
                          e.target.value
                        )
                      }
                    />
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  setVariations([
                    ...variations.slice(0, index + 1),
                    {
                      variationName: "",
                      priceAdjustment: "",
                      variationValues: [
                        {
                          attributeName: "",
                          attributeValue: "",
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
                type="button"
                onClick={() => handleRemoveVariation(index)}
              >
                Remove Variation
              </button>
            </div>
          </div>
        ))}
        <button type="button" onClick={handleAddVariation}>
          Add Variation
        </button>
      </div>
      <button type="submit">Add Product</button>
    </form>
  );
};

export default AddProductForm;
