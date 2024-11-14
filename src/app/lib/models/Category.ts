import  { Schema, model, models } from 'mongoose';

import { ICategory } from "@/app/types/category"


const categorySchema = new Schema<ICategory>({
  name: { type: String, required: true },
  recipes: [{ type: Schema.Types.ObjectId, ref: 'Recipe' }]
});


export const Category = models.Category || model<ICategory>('Category', categorySchema);
