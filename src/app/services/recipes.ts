import axios from 'axios';
import { IRecipe } from '@/app/types/recipes';
const BASE_URL = 'http://localhost:3000/api';




export async function fetchAllRecipes(): Promise<IRecipe[]> {
  try {
    const response = await axios.get(`${BASE_URL}/recipes/get/`);
    console.log('API Response:', response.data);
    return response.data.recipes;
  } catch (error) {
    console.error('Error fetching all recipes:', error);
    throw error;
  }
}



export async function fetchRecipesByCategory(categoryName: string): Promise<IRecipe[]> {
  try {
    const response = await axios.get(`${BASE_URL}/category/get/${categoryName}`);
    console.log(response.data);
    
    return response.data;
  } catch (error) {
    console.error(`Error fetching recipes for category ${categoryName}:`, error);
    throw error;
  }
}

export async function fetchRecipesByName(recipeName: string): Promise<IRecipe[]> {
  try {
    const response = await axios.get(`${BASE_URL}/recipes/get/${recipeName}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching recipes for category ${recipeName}:`, error);
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

export async function addRecipe(recipeData: Partial<IRecipe>): Promise<object> {
  try {
    console.log("Sending data:", recipeData);
    const response = await axios.post(`${BASE_URL}/recipes/post`, recipeData, {
      headers: { 'Content-Type': 'application/json' },
    });
    console.log("Server response:", typeof(response.data.recipe));
    return response.data.recipe ;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error response data:", error.response?.data);
      console.error("Error response status:", error.response?.status);
    } else {
      console.error("Unexpected error:", error);
    }
    throw error;
  }
  
}
