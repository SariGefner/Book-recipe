import mongoose, { Schema, Document, model, models, Types } from 'mongoose';

export interface IRecipe extends Document {
  image: string;
  name: string;
  category: Types.ObjectId;
  ingredients: string[];
  favorite: boolean;
}


const recipeSchema = new Schema<IRecipe>({
  image: { type: String, required: true },
  name: { type: String, required: true },
  category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  ingredients: { type: [String], required: true },
  favorite: { type: Boolean, default: false }
});


export const Recipe = models.Recipe || model<IRecipe>('Recipe', recipeSchema);
