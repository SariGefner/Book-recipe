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
import { IRecipe } from '@/app/types/recipes';
import Card from './card';
import { fetchAllRecipes } from '../services/recipes';
import Header from "@/app/components/header";
interface CardsListProps {
  favorite?: boolean;

}

const CardsList: React.FC<CardsListProps> = ({ favorite = false }) => {
  const [recipes, setRecipes] = useState<IRecipe[]>([]);
  const[filterRecipes,setFilter]= useState<IRecipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 8; // Number of recipes per page

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const fetchedRecipes = await fetchAllRecipes();
        console.log(fetchAllRecipes);
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

  // Calculate recipes to show on the current page
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

  // Page navigation handlers
  const totalPages = Math.ceil(recipes.length / recipesPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div>
      <Header recipes={recipes} setRecipes={setFilter} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filterRecipes.map((recipe) => (
          <Card key={recipe.name} {...recipe} />
        ))}
      </div>

      <div className="flex justify-center mt-4">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 mr-2 ${currentPage === 1 ? 'text-gray-400' : 'text-blue-500'}`}
        >
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 ml-2 ${currentPage === totalPages ? 'text-gray-400' : 'text-blue-500'}`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CardsList;
