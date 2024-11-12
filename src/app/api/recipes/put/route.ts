import { NextResponse } from 'next/server';
import connectDb from '@/app/lib/db/connectDb'; 
import { Recipe } from '@/app/lib/models/Recipe';
import { Category } from '@/app/lib/models/Category';

export async function PUT(req) {
  try {
    const { recipeId, image, name, categoryName, ingredients, favorite } = await req.json();

    // וידוא שכל השדות הנדרשים קיימים
    if (!recipeId || !image || !name || !categoryName || !ingredients || !favorite) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    await connectDb();

    // חיפוש המתכון לפי ה-ID
    const recipeToUpdate = await Recipe.findById(recipeId);
    if (!recipeToUpdate) {
      return NextResponse.json(
        { error: 'Recipe not found' },
        { status: 404 }
      );
    }

    // עדכון המתכון
    recipeToUpdate.image = image;
    recipeToUpdate.name = name;
    recipeToUpdate.categoryName = categoryName;
    recipeToUpdate.ingredients = ingredients;
    recipeToUpdate.favorite = favorite;

    // שמירה של המתכון המעודכן
    const updatedRecipe = await recipeToUpdate.save();

    // עדכון הקטגוריה על פי השם
    await Category.findOneAndUpdate(
      { categoryName: categoryName },
      { $push: { recipes: updatedRecipe._id } },
      { new: true }
    );

    return NextResponse.json(
      { message: 'Recipe updated successfully', recipe: updatedRecipe },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating Recipe:', error);
    return NextResponse.json(
      { error: 'Failed to update Recipe', details: error.message },
      { status: 500 }
    );
  }
}
