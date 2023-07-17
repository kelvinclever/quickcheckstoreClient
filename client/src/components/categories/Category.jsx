import React, { useState, useEffect } from "react";
import './categories.css'
const Categories = (products) => {
  const [categories, setCategories] = useState([]);

  async function getCategories() {
    const response = await fetch('http://localhost:8082/categories');
    const data = await response.json();
    setCategories(data.categories);
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="category-container">
      {categories.map((category) => (
        <div key={category.category_id}>
          <span>{category.category_name}</span>
        </div>
      ))}
    </div>
  );
};

export default Categories;
