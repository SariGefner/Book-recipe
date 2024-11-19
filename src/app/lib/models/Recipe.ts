import { Schema, model, models } from 'mongoose';
import { IRecipe } from "@/app/types/recipes";

const recipeSchema = new Schema<IRecipe>({
  image: { type: String, required: true },
  name: { type: String, required: true },
  categoryName: { type: String, ref: 'Category', required: true },
  // categoryName: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  ingredients: { type: [String], required: true, default: [] },
  favorite: { type: Boolean, default: false },
  preparationInstructions: { type: String, maxlength: 100, required: true },
});

recipeSchema.index({ name: 1, categoryName: 1 }, { unique: true });

export const Recipe = models.Recipe || model<IRecipe>('Recipe', recipeSchema);