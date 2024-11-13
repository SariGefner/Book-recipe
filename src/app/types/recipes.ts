import mongoose, { Document } from 'mongoose';

export interface IRecipe extends Document {
  _id: mongoose.Types.ObjectId;
  image: string;
  name: string;
  categoryName: string;
  ingredients: string[];
  favorite: boolean;
  preparationInstructions: string;
}
