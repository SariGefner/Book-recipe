
import { Document, Types } from 'mongoose';
export interface IRecipe extends Document {
  image: string;
  name: string;
  category: Types.ObjectId;
  ingredients: string[];
  favorite: boolean;
  preparationInstructions: string;
}