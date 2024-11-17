// 'use client'
// import React, { useState } from 'react';
// import { IRecipeData } from '../types/recipes';
// import { addRecipe } from '../services/recipes';

// const AddRecipeForm: React.FC = () => {
//   const [formData, setFormData] = useState<Omit<IRecipe, '_id'>>({
//     image: '',
//     name: '',
//     categoryName: '',
//     ingredients: [],
//     favorite: false,
//     preparationInstructions: '',
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       await addRecipe(formData);
//       alert('Recipe added successfully');
//     } catch (error) {
//       console.error('Failed to add recipe:', error);
//       alert('Error adding recipe');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow-md">
//       <h2 className="text-xl font-bold mb-4">Add a New Recipe</h2>
//       <label className="block mb-2">
//         Image URL:
//         <input
//           type="text"
//           name="image"
//           value={formData.image}
//           onChange={handleChange}
//           className="w-full p-2 border rounded"
//           required
//         />
//       </label>
//       <label className="block mb-2">
//         Name:
//         <input
//           type="text"
//           name="name"
//           value={formData.name}
//           onChange={handleChange}
//           className="w-full p-2 border rounded"
//           required
//         />
//       </label>
//       <label className="block mb-2">
//         Category:
//         <input
//           type="text"
//           name="categoryName"
//           value={formData.categoryName}
//           onChange={handleChange}
//           className="w-full p-2 border rounded"
//           required
//         />
//       </label>
//       <label className="block mb-2">
//         Ingredients (comma separated):
//         <input
//           type="text"
//           name="ingredients"
//           value={formData.ingredients.join(', ')}
//           onChange={(e) =>
//             setFormData({ ...formData, ingredients: e.target.value.split(',').map(i => i.trim()) })
//           }
//           className="w-full p-2 border rounded"
//           required
//         />
//       </label>
//       <label className="block mb-2">
//         Preparation Instructions:
//         <textarea
//           name="preparationInstructions"
//           value={formData.preparationInstructions}
//           onChange={handleChange}
//           className="w-full p-2 border rounded"
//           required
//         />
//       </label>
//       <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700 mt-4">
//         Add Recipe
//       </button>
//     </form>
//   );
// };

// export default AddRecipeForm;
