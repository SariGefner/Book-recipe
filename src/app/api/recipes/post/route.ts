import { NextRequest, NextResponse } from 'next/server';
import connectDb from '@/app/lib/db/connectDb';
import { Recipe } from '@/app/lib/models/Recipe';
import { Category } from '@/app/lib/models/Category';

// Type guard to check if the error has a `code` property (mongoose duplicate key error)
function isErrorWithCode(error: unknown): error is { code: number } {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    typeof (error as { code: unknown }).code === 'number'
  );
}

export async function POST(req: NextRequest) {
  try {
    const { image, name, categoryName, ingredients, favorite, preparationInstructions } = await req.json();

    if (!image || !name || !categoryName || !ingredients || favorite === undefined || !preparationInstructions) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    await connectDb();

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
    if (isErrorWithCode(error)) {
      if (error.code === 11000) {
        return NextResponse.json(
          { error: 'Recipe with this name already exists' },
          { status: 400 }
        );
      }
    }

    if (error instanceof Error) {
      console.error('Error creating Recipe:', error.message);
      return NextResponse.json(
        { error: 'Failed to create Recipe', details: error.message },
        { status: 500 }
      );
    }

    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
