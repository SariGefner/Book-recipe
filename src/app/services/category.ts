import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api';




export async function fetchAllCategory() {
  try {
    const response = await axios.get(`${BASE_URL}/category/get/`);
    console.log('API Response:', response.data); 
    return response.data.categories;
  } catch (error) {
    console.error('Error fetching all recipes:', error);
    throw error;
  }
}