'use client'
import React, { useEffect, useState } from 'react';
import { IRecipe } from '@/app/types/recipes';
import Card from './card';
import { fetchAllRecipes } from '../services/recipes';

interface CardsListProps {
  favorite?: boolean; // Adding favorite prop with default value false
}

const CardsList: React.FC<CardsListProps> = ({ favorite = false }) => {
  const [recipes, setRecipes] = useState<IRecipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const fetchedRecipes = await fetchAllRecipes();
        console.log(fetchedRecipes);

        if (Array.isArray(fetchedRecipes)) {
          // Filter recipes if favorite is true
          const filteredRecipes = favorite
            ? fetchedRecipes.filter((recipe) => recipe.favorite)
            : fetchedRecipes;
          setRecipes(filteredRecipes);
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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {recipes.map((recipe) => (
        <Card key={recipe.name} {...recipe} />
      ))}
    </div>
  );
};

export default CardsList;
