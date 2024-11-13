
"use client"
import Header from "@/app/components/header";
import { fetchAllRecipes } from "@/app/services/category";
import React, { useEffect, useState } from "react";

const AllRecipes = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAllRecipes();
        setRecipes(data);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };
    fetchData();
  }, []);

  const handleSearch = (query: string) => {
    // Implement search functionality
    console.log('Search query:', query);
  };

  const handleCategoryChange = (category: string) => {
    // Implement category change functionality
    console.log('Selected category:', category);
  };

  return (
    <div>
      <Header onSearch={handleSearch} onCategoryChange={handleCategoryChange} />
  
    </div>
  );
    
  };
  
  export default AllRecipes;
  