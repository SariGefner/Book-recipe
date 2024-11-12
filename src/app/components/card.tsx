import Image from 'next/image';
import { IRecipe } from '../types/recipes';
type RecipeProps = Pick<IRecipe, 'image' | 'name' | 'categoryName' | 'ingredients' | 'favorite'>;

const RecipeCard: React.FC<RecipeProps> = ({ image, name, categoryName, ingredients, favorite }) => {
  // component code
// };
// const RecipeCard: React.FC<IRecipe> = ({ image, name, categoryName, ingredients, favorite }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white p-4">
      <div className="relative h-48 w-full">
        <Image src={image} alt={name} layout="fill" objectFit="cover" className="rounded-t-lg" />
      </div>
      <div className="px-6 py-4">
        <h2 className="font-bold text-xl mb-2">{name}</h2>
        <p className="text-gray-600 mb-2">{categoryName}</p>
        <p className="text-gray-700 text-sm mb-2">Ingredients:</p>
        <ul className="list-disc list-inside text-gray-700 text-sm">
          {ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </div>
      <div className="px-6 py-4 flex justify-between items-center">
        <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700">
          {favorite ? 'Unfavorite' : 'Favorite'}
        </button>
      </div>
    </div>
  );
};

export default RecipeCard;
