import { create } from 'zustand';
import { IRecipe } from '@/app/types/recipes';

interface RecipesState {
  recipes: IRecipe[];
  addRecipe: (recipe: IRecipe) => void;
  removeRecipe: (recipe: IRecipe) => void;
  updateRecipe: (recipe: IRecipe) => void;
}

export const useRecipesStore = create<RecipesState>()((set) => ({
  recipes: [],
  addRecipe: (recipe) => set((state) => ({ recipes: [...state.recipes, recipe] })),
  removeRecipe: (recipe) =>
    set((state) => ({
      recipes: state.recipes.filter((r) => r.name !== recipe.name),
    })),
  updateRecipe: (recipe) =>
    set((state) => ({
      recipes: state.recipes.map((r) => (r.name === recipe.name ? recipe : r)),
    })),
}));

export default useRecipesStore;