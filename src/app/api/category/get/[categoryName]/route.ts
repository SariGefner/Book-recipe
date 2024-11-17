import { NextResponse } from 'next/server';
import connectDb from '@/app/lib/db/connectDb';
import { Category } from '@/app/lib/models/Category';

interface RouteParams {
  categoryName: string;
}

export async function GET(
  req: Request,
  context: { params: RouteParams }
): Promise<Response> {
  try {
    await connectDb();

    // Extract `categoryName` from `params`
    const { categoryName } = context.params;

    // Find category in database and populate recipes
    const category = await Category.findOne({ categoryName }).populate('recipes');

    if (!category) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      );
    }

    // Return success response with recipes
    return NextResponse.json(
      {
        message: 'Category recipes fetched successfully',
        category: category.recipes,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching category and recipes:', error);

    // Return error response
    return NextResponse.json(
      {
        error: 'Failed to fetch recipes',
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
