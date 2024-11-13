
import { NextRequest, NextResponse } from 'next/server';
import connectDb from '@/app/lib/db/connectDb'; 
import {Recipe} from '@/app/lib/models/Recipe';
import {Category} from '@/app/lib/models/Category';


export async function POST(req : NextRequest) {
  try {
    const { image,name, categoryName, ingredients, favorite } = await req.json();

    if (!image||!name || !categoryName || !ingredients || !favorite) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    await connectDb();

  
    const newRecipe = new Recipe({ image,name, categoryName, ingredients, favorite });
    await newRecipe.save();



    await Category.findOneAndUpdate(
      { categoryName: categoryName },
      { $push: { recipes: newRecipe._id} },
      { new: true }
    );
    return NextResponse.json(
      { message: 'Recipe created successfully', recipe: newRecipe },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating Recipe:', error);
    return NextResponse.json(
      { error: 'Failed to create Recipe', details: error},
      { status: 500 }
    );
  }
}