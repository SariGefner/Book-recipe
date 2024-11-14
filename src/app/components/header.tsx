
"use client"
import { useState, useEffect } from 'react';
import { fetchAllRecipes } from '@/app/services/category';

<<<<<<< HEAD
interface HeaderProps {
  onSearch: (query: string) => void;
  onCategoryChange: (category: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch, onCategoryChange }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAllRecipes();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchData();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearch(value);
  };

  return (
    <div className="w-full px-4 py-6">
    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
      <h1 className="text-2xl font-bold text-gray-800">Recipes</h1>
      
      <div className="flex flex-1 items-center gap-4 max-w-2xl">
        {/* Category Selector */}
        <select 
          className="px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 min-w-[150px] focus:outline-none focus:ring-2 focus:ring-purple-500"
          onChange={(e) => onCategoryChange(e.target.value)}
          defaultValue=""
        >
          <option value="" disabled>Pick a Category</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        {/* Search Input */}
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <svg 
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
=======
    return(

        <div>
            <h1>Recipes</h1>
            <br></br>
            <label>pick a category</label>
           <select>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
           </select>
           <input type="search" id="search-input" name="search" placeholder="Search..." aria-label="Search"></input>
>>>>>>> 934823082f20c81806a407b96fd007d3aa0bb471
        </div>
      </div>

      {/* Add Recipe Button */}
      <button 
        className="px-6 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
      >
        Add Recipe
      </button>
    </div>
  </div>
  );
};

export default Header;