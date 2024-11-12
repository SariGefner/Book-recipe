

// export default function Home() {
//   return (
//     <div>
//       <h1>hello to our book recipe</h1>
//     </div>
//   );

import RecipeCard from "./components/card";

// }
const ExamplePage: React.FC = () => {
  const recipeData = {
    image: "https://infobase.click/wp-content/uploads/2023/12/111-1.jpg",
    name: "Pasta",
    categoryName: "Main Course",
    ingredients: ["Noodles", "Sauce"],
    favorite: true,
    preparationInstructions: "Boil pasta and add sauce.",
    preparationDays: 5
  };

  return (
    <div className="p-4">
      <RecipeCard {...recipeData} />
    </div>
  );
};

export default ExamplePage;
