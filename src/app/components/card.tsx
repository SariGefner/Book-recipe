
'use client'

import { IRecipe } from '../types/recipes';
import { useState } from 'react';
import RecipeDetails from './recipeDetails';
import { updateRecipe } from '../services/recipes';


type RecipeProps = Pick<IRecipe, 'image' | 'name' | 'categoryName' | 'ingredients' | 'favorite' | 'preparationInstructions'>;

const Card: React.FC<RecipeProps> = ({ image, name, categoryName, ingredients, favorite, preparationInstructions }) => {
  const [isFavorite, setIsFavorite] = useState(favorite);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  
  const handleFavoriteToggle = async () => {
    try {
      await updateRecipe(name, !isFavorite); 
      setIsFavorite((prev) => !prev); 
    } catch (error) {
      console.error("Failed to update favorite status:", error);
    }
  };


  const handleReadMore = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white p-4 relative">
      <div className="relative h-48 w-full">
        {/* <Image src={image} alt={name} layout="fill" objectFit="cover" className="rounded-t-lg" /> */}
      </div>
      <div className="px-6 py-4">
    
        <div className="flex justify-between items-center mb-2">
          <h2 className="font-bold text-xl">{name}</h2>
          <button
            onClick={handleFavoriteToggle}
            className={`bg-blue-500 text-white px-3 py-1 rounded ${isFavorite ? 'bg-red-500' : 'bg-blue-500'}`}
          >
            {isFavorite ? '💗' : '💗'}
          </button>
        </div>
        <p className="text-gray-600 mb-2">{categoryName}</p>
        <p className="text-gray-700 text-sm mb-2">Ingredients: {ingredients.join(', ')}</p>
        <p className="text-gray-700 text-sm mb-2">
          {preparationInstructions.slice(0, 100)}...
        </p>
        <button
          onClick={handleReadMore}
          className="text-blue-500 hover:underline mb-4"
        >
          Read More
        </button>
      </div>

      {/* Popup for detailed instructions */}
      {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <RecipeDetails {...{ image, name, categoryName, ingredients, favorite: isFavorite, preparationInstructions }} />
            <button
              onClick={handleClosePopup}
              className="text-white bg-blue-500 px-4 py-2 rounded hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
