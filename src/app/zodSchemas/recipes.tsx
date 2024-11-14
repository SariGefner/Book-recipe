import { z } from 'zod';

export const RecipeSchema = z.object({
  image: z.string().url(),
  name: z.string().min(1, "Recipe name is required"),
  categoryName: z.string().min(1, "Category name is required"),
  ingredients: z.array(z.string()).nonempty("Ingredients cannot be empty"),
  favorite: z.boolean().optional(),
  preparationInstructions: z.string().min(1, "Instructions are required"),
  preparationDays: z.number().max(100, "Preparation days must be 100 or less")
});

export type Recipe = z.infer<typeof RecipeSchema>;