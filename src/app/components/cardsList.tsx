'use client'
import React, { useEffect, useState } from 'react';
import { IRecipe } from '@/app/types/recipes';
import Card from './card';
import { fetchAllRecipes, addRecipe } from '../services/recipes';
import Header from "@/app/components/header";
import NewRecips from './newRecipe';

interface CardsListProps {
  favorite?: boolean;
}

const CardsList: React.FC<CardsListProps> = ({ favorite = false }) => {
  const [recipes, setRecipes] = useState<IRecipe[]>([]);
  const [filterRecipes, setFilter] = useState<IRecipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAddRecipeOpen, setIsAddRecipeOpen] = useState(false);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const fetchedRecipes = await fetchAllRecipes();
        if (Array.isArray(fetchedRecipes)) {
          const filteredRecipes = favorite
            ? fetchedRecipes.filter((recipe) => recipe.favorite)
            : fetchedRecipes;
          setRecipes(filteredRecipes);
          setFilter(filteredRecipes);
        } else {
          throw new Error('Fetched data is not an array');
        }
      } catch (err) {
        setError('Failed to load recipes');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipes();
  }, [favorite]);

  const handleAddRecipe = async (newRecipe: Omit<IRecipe, '_id'>) => {
    try {
      const addedRecipe = await addRecipe(newRecipe);
      setRecipes((prev) => [...prev, addedRecipe]);
      setFilter((prev) => [...prev, addedRecipe]);
    } catch (error) {
      console.error('Error adding recipe:', error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      {/* <Header recipes={recipes} setRecipes={setFilter} /> */}
      <Header
        recipes={recipes}
        setRecipes={setFilter}
        onAddRecipeClick={() => setIsAddRecipeOpen(true)}
      />

      {/* <button
        onClick={() => setIsAddRecipeOpen(true)}
        className="bg-green-500 text-white px-4 py-2 rounded mb-4"
      > */}
        {/* Add Recipe
      </button> */}
      {isAddRecipeOpen && (
        <NewRecips
          onAdd={handleAddRecipe}
          onClose={() => setIsAddRecipeOpen(false)}
        />
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filterRecipes.length > 0 ? (
          filterRecipes.map((recipe) => (
            <Card key={recipe._id.toString()} {...recipe} />
          ))
        ) : (
          <p>No recipes found.</p>
        )}
      </div>
    </div>
  );
};

export default CardsList;
