import { NextResponse } from 'next/server';
import connectDb from '@/app/lib/db/connectDb';
import { Recipe } from '@/app/lib/models/Recipe';

export async function GET() {
  try {
    await connectDb();
    const recipes = await Recipe.find();
    if (!recipes || recipes.length === 0) {
      return NextResponse.json(
        { message: 'No recipes found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { recipes },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return NextResponse.json(
      { error: 'Failed to fetch recipes', details: error },
      { status: 500 }
    );
  }
}
