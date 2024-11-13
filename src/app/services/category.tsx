import axios from 'axios';

export async function fetchAllRecipes() {
  try {
    const response = await axios.get('http://localhost:3000/api/recipes/get/');
    return response.data;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    throw error;
  }
}

