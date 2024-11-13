import axios from 'axios';
import { IRecipe } from '@/app/types/recipes';
const BASE_URL = 'http://localhost:3000/api';




export async function fetchAllRecipes(): Promise<IRecipe[]> {
  try {
    const response = await axios.get(`${BASE_URL}/recipes/get/`);
    console.log('API Response:', response.data); // Log response data
    return response.data.recipes;
  } catch (error) {
    console.error('Error fetching all recipes:', error);
    throw error;
  }
}

export async function fetchRecipesByCategory(categoryName: string): Promise<IRecipe[]> {
  try {
    const response = await axios.get(`${BASE_URL}/category/get/${categoryName}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching recipes for category ${categoryName}:`, error);
    throw error;
  }
}


export async function updateRecipe(name: string, favorite: boolean): Promise<IRecipe> {
  try {
    const response = await axios.put(`${BASE_URL}/recipes/put`, {
      name,
      favorite,
    });
    return response.data;
  } catch (error) {
    console.error('Error updating recipe:', error);
    throw error;
  }
}

export async function addRecipe(recipeData:IRecipe): Promise<IRecipe> {
  try {
    const response = await axios.post(`${BASE_URL}/recipes/post`, recipeData);
    return response.data;
  } catch (error) {
    console.error('Error adding recipe:', error);
    throw error;
  }
}
