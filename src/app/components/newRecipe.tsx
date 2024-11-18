'use client';

import { useEffect, useState } from 'react';
// import { IRecipe } from '../types/recipes';
import { IRecipe } from '@/app/types/recipes';

import { addRecipe } from '@/app/services/recipes'; // Create this service function for adding a recipe
import { ICategory } from '../types/category';
import { fetchAllCategory } from '../services/category';

interface AddRecipeFormProps {
    onClose: () => void;
    onAdd: (newRecipe: IRecipe) => void;
}

const NewRecips: React.FC<AddRecipeFormProps> = ({ onClose, onAdd }) => {
    const [categories, setCategories] = useState<ICategory[]>([]);
    
    const [name, setName] = useState('');
    const [categoryName, setCategoryName] = useState('');
    const [ingredients, setIngredients] = useState<string[]>([]);
    const [image, setImage] = useState('');
    const [preparationInstructions, setPreparationInstructions] = useState('');
    const [favorite, setFavorite] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchAllCategory();
                setCategories(data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        fetchData();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const newRecipe: Partial<IRecipe> = {
            image,
            name,
            categoryName,
            ingredients,
            favorite,
            preparationInstructions,
        };
        console.log('Payload being sent:', newRecipe);

        try {
            const addedRecipe = await addRecipe(newRecipe); // Make sure to implement this service
            onAdd(addedRecipe); // Pass the new recipe to the parent component
            onClose(); // Close the form after successful submission
        } catch (error) {
            console.error('Error adding recipe:', error);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg max-w-md w-full">
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Recipe Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full mb-4 p-2 border border-gray-300 rounded"
                    />
                    <select
                        className="w-full mb-4 p-2 border border-gray-300 rounded"
                        onChange={(e) => setCategoryName(e.target.value)}
                        defaultValue=""
                    >
                        <option value="" disabled>Pick a Category</option>
                        {categories.map((category, i) => (
                            <option key={i} value={category.categoryName}>
                                {category.categoryName}
                            </option>
                        ))}
                    </select>
                    {/* <input
                        type="text" 
                        placeholder="Category"
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                        className="w-full mb-4 p-2 border border-gray-300 rounded"
                    /> */}
                    <input
                        type="text"
                        placeholder="Ingredients (comma separated)"
                        value={ingredients.join(', ')}
                        onChange={(e) => setIngredients(e.target.value.split(',').map((item) => item.trim()))}
                        className="w-full mb-4 p-2 border border-gray-300 rounded"
                    />
                    <input
                        type="text"
                        placeholder="Image URL"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        className="w-full mb-4 p-2 border border-gray-300 rounded"
                    />
                    <textarea
                        placeholder="Preparation Instructions"
                        value={preparationInstructions}
                        onChange={(e) => setPreparationInstructions(e.target.value)}
                        className="w-full mb-4 p-2 border border-gray-300 rounded"
                    />
                    <label className="flex items-center mb-4">
                        <input
                            type="checkbox"
                            checked={favorite}
                            onChange={(e) => setFavorite(e.target.checked)}
                            className="mr-2"
                        />
                        Favorite
                    </label>
                    <div className="flex justify-between">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-500 text-white px-4 py-2 rounded"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                        >
                            Add Recipe
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NewRecips;
