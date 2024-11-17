'use client'
// import React, { useEffect, useState } from 'react';
// import { IRecipeData } from '../types/recipes';
// import Card from './card';
// import { fetchAllRecipes } from '../services/recipes';

// const CardsList: React.FC = () => {
//   const [recipes, setRecipes] = useState<IRecipeData[]>([]);  // Store recipes in state
//   const [loading, setLoading] = useState(true);  // Handle loading state
//   const [error, setError] = useState<string | null>(null);  // Handle error state

//   useEffect(() => {
//     const fetchRecipes = async () => {
//       try {
//         const fetchedRecipes = await fetchAllRecipes();  // Await the result of the async function
//         if (Array.isArray(fetchedRecipes)) {
//             // Transform IRecipe[] to IRecipeData[] by converting _id to string
//             const transformedRecipes: IRecipeData[] = fetchedRecipes.map(recipe => ({
//               ...recipe,
//               _id: recipe._id.toString()  // Convert ObjectId to string
//             }));

//             setRecipes(transformedRecipes);  // Set the transformed recipes to state
//           } else {
//             throw new Error('Fetched data is not an array');
//           }
//       } catch (err) {
//         setError('Failed to load recipes');
//         console.error(err);
//       } finally {
//         setLoading(false);  // Set loading to false when done
//       }
//     };
//     fetchRecipes();
//   }, []);  // Empty dependency array to run the effect only once when the component mounts

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>{error}</div>;

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//       {recipes.map((recipe) => (
//         <Card key={recipe._id} {...recipe} />  // Pass the recipe props to the Card component
//       ))}
//     </div>
//   );
// };

// export default CardsList;
import React, { useEffect, useState } from 'react';
// import { IRecipe } from '../lib/models/Recipe';  // Adjust path as needed
import Card from './card';
import { fetchAllRecipes } from '../services/recipes';
import { IRecipe } from '../types/recipes';

const CardsList: React.FC = () => {
    const [recipes, setRecipes] = useState<IRecipe[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const fetchedRecipes = await fetchAllRecipes();
                setRecipes(fetchedRecipes);
            } catch (err) {
                setError('Failed to load recipes');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchRecipes();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {recipes.map((recipe) => (
                <Card key={recipe._id.toString()} {...recipe} />
    //             <Card
    //                 key={recipe._id.toString()}
    //                 {...recipe, category: recipe.category.toString()}
    //                 />
      ))}
        </div>
    );
};

export default CardsList;
