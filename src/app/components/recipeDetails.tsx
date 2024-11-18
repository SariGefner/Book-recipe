'use client'
// import Image from "next/image";
import { IRecipe } from "../types/recipes";

type RecipeProps = Pick<IRecipe, 'image' | 'name' | 'categoryName' | 'ingredients' | 'favorite' | 'preparationInstructions'>;

const RecipeDetails: React.FC<RecipeProps> = ({ name, categoryName, ingredients, favorite, preparationInstructions }) => {
    // const RecipeDetails: React.FC<RecipeProps> = ({ image, name, categoryName, ingredients, favorite, preparationInstructions }) => {

    return (
        <div>
            <div className="relative h-48 w-full">
                
                {/* <Image src={image} alt={name} layout="fill" objectFit="cover" className="rounded-t-lg" /> */}
            </div>
            <div className="px-6 py-4">
                <div className="flex justify-between items-center mb-2">
                    <h2 className="font-bold text-xl">{name}</h2>
                    <button
                        // onClick={handleFavoriteToggle}
                        className={`bg-blue-500 text-white px-3 py-1 rounded ${favorite ? 'bg-red-500' : 'bg-blue-500'}`}
                    >
                        {favorite ? '💗' : '💗'}
                    </button>
                </div>
                {/* <h2 className="font-bold text-xl mb-2">{name}</h2> */}
                <p className="text-gray-600 mb-2">{categoryName}</p>
                <p className="text-gray-700 text-sm mb-2">Ingredients:</p>
                <ul className="list-disc list-inside text-gray-700 text-sm mb-2">
                    {ingredients.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                    ))}
                </ul>
                <p className="text-gray-700 text-sm mb-2">{preparationInstructions}</p>
            </div>
            {/* <div className="px-6 py-4 flex justify-between items-center"> */}
                {/* <button className={`bg-blue-500 text-white px-3 py-1 rounded ${favorite ? 'bg-red-500' : 'bg-blue-500'}`} > */}
                    {/* <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700"> */}
                    {/* {favorite ? '💗' : '💗'} */}
                {/* </button> */}
            {/* </div> */}
            
        </div >
    );
}
export default RecipeDetails