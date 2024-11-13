import React from 'react';
import { IRecipeData } from '../types/recipes';
import Card from './card';

interface RecipesTableProps {
    recipes: IRecipeData[];
}

const CardsList: React.FC<RecipesTableProps> = ({ recipes }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {recipes.map((recipe) => (
                <Card key={recipe._id.toString()} {...recipe} />
            ))}
        </div>
    );
};

export default CardsList;
