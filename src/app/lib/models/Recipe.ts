import { Schema, model, models } from 'mongoose';

import { IRecipe } from "@/app/types/recipes"




const recipeSchema = new Schema<IRecipe>({
  image: { type: String, required: true },
  name: {
    type: String, required: true, unique: true
  },
  category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  ingredients: { type: [String], required: true },
  favorite: { type: Boolean, default: false }
});


export const Recipe = models.Recipe || model<IRecipe>('Recipe', recipeSchema);