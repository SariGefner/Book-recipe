'use client'
import { IRecipe } from "../types/recipes";

type RecipeProps = Pick<IRecipe, 'image' | 'name' | 'categoryName' | 'ingredients' | 'favorite' | 'preparationInstructions'>;

const RecipeDetails: React.FC<RecipeProps> = ({ name, categoryName, ingredients, favorite, preparationInstructions }) => {

    return (
        <div>
            <div className="relative w-full h-48">

                {/* <Image src={image} alt={name} layout="fill" objectFit="cover" className="rounded-t-lg" /> */}
            </div>
            <div className="px-6 py-4">
                <div className="flex items-center justify-between mb-2">
                    <h2 className="text-xl font-bold">{name}</h2>
                    <button
                        // onClick={handleFavoriteToggle}
                        className={`bg-blue-500 text-white px-3 py-1 rounded ${favorite ? 'bg-red-500' : 'bg-blue-500'}`}
                    >
                        {favorite ? '💗' : '💗'}
                    </button>
                </div>
                {/* <h2 className="mb-2 text-xl font-bold">{name}</h2> */}
                <p className="mb-2 text-gray-600">{categoryName}</p>
                <p className="mb-2 text-sm text-gray-700">Ingredients:</p>
                <ul className="mb-2 text-sm text-gray-700 list-disc list-inside">
                    {ingredients.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                    ))}
                </ul>
                <p className="mb-2 text-sm text-gray-700">{preparationInstructions}</p>
            </div>
        </div >
    );
}
export default RecipeDetails