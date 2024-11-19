import { NextResponse } from 'next/server';
import connectDb from '@/app/lib/db/connectDb';
import { Category } from '@/app/lib/models/Category';

export async function GET() {
  try {
    await connectDb();
    const categories = await Category.find().select("categoryName");
    console.log(categories);
    if (!categories || categories.length === 0) {
      return NextResponse.json(
        { message: 'No categories found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { categories },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories', details: error },
      { status: 500 }
    );
  }
}
