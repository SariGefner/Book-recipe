
import { Document } from 'mongoose';
  export interface IRecipe extends Document {
    image: string;
    name: string;
    categoryName: string;
    ingredients: string[];
    favorite: boolean;
  }