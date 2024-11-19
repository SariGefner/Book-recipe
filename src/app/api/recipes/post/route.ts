import { NextRequest, NextResponse } from 'next/server';
import connectDb from '@/app/lib/db/connectDb';
import { Recipe } from '@/app/lib/models/Recipe';
import { Category } from '@/app/lib/models/Category';
export async function POST(req: NextRequest) {
  try {
    const { image, name, categoryName, ingredients, favorite, preparationInstructions } = await req.json();

    // בדיקת אורך ההוראות
    const maxLength = 100;
    if (preparationInstructions.length > maxLength) {
      return NextResponse.json(
        { error: `Preparation instructions must be no longer than ${maxLength} characters.` },
        { status: 400 }
      );
    }

    if (!image || !name || !categoryName || !ingredients || favorite === undefined || !preparationInstructions) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    await connectDb();

    const existingRecipe = await Recipe.findOne({ name, categoryName });
    if (existingRecipe) {
      return NextResponse.json(
        { error: 'Recipe with this name already exists in this category' },
        { status: 400 }
      );
    }

    let category = await Category.findOne({ categoryName });

    if (!category) {
      category = new Category({ categoryName, recipes: [] });
      await category.save();
    }

    const newRecipe = new Recipe({
      image,
      name,
      categoryName,
      ingredients,
      favorite,
      preparationInstructions,
    });

    await newRecipe.save();

    await Category.findOneAndUpdate(
      { _id: category._id },
      { $push: { recipes: newRecipe._id } },
      { new: true }
    );

    return NextResponse.json(
      { message: 'Recipe created successfully', recipe: newRecipe },
      { status: 201 }
    );
  } catch (error: unknown) {
    return NextResponse.json(
      { error: 'Failed to create Recipe', details: error },
      { status: 500 }
    );
  }
}
