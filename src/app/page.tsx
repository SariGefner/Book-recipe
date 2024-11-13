

// export default function Home() {
//   return (
//     <div>
//       <h1>hello to our book recipe</h1>
//     </div>
//   );


// }
import CardsList from "./components/cardsList";

const ExamplePage: React.FC = () => {
  const recipeData = [
    {
      _id: "1", // add unique ids
      image: "https://infobase.click/wp-content/uploads/2023/12/111-1.jpg",
      name: "Pasta",
      categoryName: "Main Course",
      ingredients: ["Noodles", "Sauce"],
      favorite: true,
      preparationInstructions: "Boil pasta and add sauce.",
    },
    {
      _id: "2",
      image: "https://infobase.click/wp-content/uploads/2023/12/111-1.jpg",
      name: "Pizza",
      categoryName: "Main Course",
      ingredients: ["Dough", "Tomato", "Cheese"],
      favorite: false,
      preparationInstructions: "Bake dough with toppings.",
    },
  ];

  return (
    <div className="p-4">
      <CardsList recipes={recipeData} />
    </div>
  );
};

export default ExamplePage;

