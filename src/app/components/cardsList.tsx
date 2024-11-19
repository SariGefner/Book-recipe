'use client'
import React, { useEffect, useState } from 'react';
import { IRecipe } from '@/app/types/recipes';
import Card from './card';
import { fetchAllRecipes } from '../services/recipes';
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

  const handleAddRecipe = async (newRecipe: object) => {
    try {
      // const addedRecipe = await addRecipe(newRecipe);
      setRecipes((prev) => [...prev, newRecipe as IRecipe]);
      setFilter((prev) => [...prev, newRecipe as IRecipe]);
    } catch (error) {
      console.error('Error adding recipe:', error);
    }
  };

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



  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <Header
        recipes={recipes}
        setRecipes={setFilter}
        onAddRecipeClick={() => setIsAddRecipeOpen(true)}
      />
      {isAddRecipeOpen && (
        <NewRecips
          onAdd={handleAddRecipe}
          onClose={() => setIsAddRecipeOpen(false)}
        />
      )}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filterRecipes.length > 0 ? (
          filterRecipes.map((recipe) => (
            <Card key={recipe.name} {...recipe} />
          ))
        ) : (
          <p>No recipes found.</p>
        )}
      </div>
    </div>
  );
};

export default CardsList;
