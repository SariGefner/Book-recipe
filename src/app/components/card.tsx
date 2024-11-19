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
    <div className="relative max-w-sm p-4 overflow-hidden bg-white rounded shadow-lg">
      <div className="relative w-full h-48">
        {/* <Image src={image} alt={name} layout="fill" objectFit="cover" className="rounded-t-lg" /> */}
      </div>
      <div className="px-6 py-4">

        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-bold">{name}</h2>
          <button
            onClick={handleFavoriteToggle}
            className={`bg-blue-500 text-white px-3 py-1 rounded ${isFavorite ? 'bg-red-500' : 'bg-blue-500'}`}
          >
            {isFavorite ? '💗' : '💗'}
          </button>
        </div>
        <p className="mb-2 text-gray-600">Category ID: {categoryName.toString()}</p>
        <p className="mb-2 text-sm text-gray-700">Ingredients: {ingredients.join(', ')}</p>
        <p className="mb-2 text-sm text-gray-700">
          {preparationInstructions.slice(0, 100)}...
        </p>
        <button onClick={handleReadMore} className="mb-4 text-blue-500 hover:underline">
          Read More
        </button>
      </div>

      {/* Popup for detailed instructions */}
      {isPopupOpen && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md p-6 bg-white rounded-lg">
            <RecipeDetails {...{ image, name, categoryName, ingredients, favorite: isFavorite, preparationInstructions }} />
            <button
              onClick={handleClosePopup}
              className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700"
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
