
import { NextResponse } from 'next/server';
import connectDb from '@/app/lib/db/connectDb';
import { Category } from '@/app/lib/models/Category';

export async function GET() {
  try {
    console.log('API route hit: /api/categories');
    await connectDb();
    const categories = await Category.find();
    console.log('Found categories:', categories);
    return NextResponse.json({ categories: categories });
  } catch (error) {
    console.error('Error in categories API route:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}