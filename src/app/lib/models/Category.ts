import mongoose, { Schema, Document, model, models, Types } from 'mongoose';
import { IRecipe } from './Recipe';


export interface ICategory extends Document {

  name: string;
  recipes: Types.ObjectId[]; 
}


const categorySchema = new Schema<ICategory>({
  name: { type: String, required: true },
  recipes: [{ type: Schema.Types.ObjectId, ref: 'Recipe' }]
});


export const Category = models.Category || model<ICategory>('Category', categorySchema);
