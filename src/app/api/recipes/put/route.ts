import { NextRequest, NextResponse } from 'next/server';
import connectDb from '@/app/lib/db/connectDb';
import { Recipe } from '@/app/lib/models/Recipe';

export async function PUT(req: NextRequest) {
  try {
    const { name, favorite } = await req.json();

    if (!name || favorite === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    await connectDb();

    const recipeToUpdate = await Recipe.findOne({ name: name });
    if (!recipeToUpdate) {
      return NextResponse.json(
        { error: 'Recipe not found' },
        { status: 404 }
      );
    }


    recipeToUpdate.favorite = favorite;
    const updatedRecipe = await recipeToUpdate.save();

    return NextResponse.json(
      { message: 'Recipe favorite status updated successfully', recipe: updatedRecipe },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating Recipe:', error);
    return NextResponse.json(
      { error: 'Failed to update Recipe favorite status', details: error },
      { status: 500 }
    );
  }
}
