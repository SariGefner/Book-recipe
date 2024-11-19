import { NextResponse } from 'next/server';
import connectDb from '@/app/lib/db/connectDb';
import { Recipe } from '@/app/lib/models/Recipe';

export async function GET(req: Request, { params }: { params: { recipeName: string } }) {
  try {
    await connectDb();
    const { recipeName } = params;
    console.log(recipeName);
    console.log(params);
    const recipe = await Recipe.findOne({ name: recipeName }).populate('category');
    console.log(recipe, "!!!!!!!!!!!!!!");
    if (!recipe) {
      return NextResponse.json(
        { error: 'Recipe not found' },
        { status: 404 }
      );
    }

    // Return the recipe details in the response
    return NextResponse.json(
      { message: 'Recipe fetched successfully', recipe },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching recipe by name:', error);

    // Handle server errors
    return NextResponse.json(
      { error: 'Failed to fetch recipe', details: error },
      { status: 500 }
    );
  }
}
