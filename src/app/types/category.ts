import  {  Document, Types } from 'mongoose';
export interface ICategory extends Document {
    categoryName: string;
    recipes: Types.ObjectId[]; 
  }