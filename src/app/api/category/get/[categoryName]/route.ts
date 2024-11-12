import { NextResponse } from 'next/server';
import connectDb from '@/app/lib/db/connectDb'; 
import { Category } from '@/app/lib/models/Category';

export async function GET(req: Request, { params }: { params: { categoryName: string } }) {
    try {
      await connectDb();
      const { categoryName } = params;
  
      const category = await Category.findOne({ categoryName:categoryName }).populate('recipes');
  
  
      if (!category) {
        return NextResponse.json(
          { error: 'category not found' },
          { status: 404 }
        );
      }
  
  
      return NextResponse.json(
        { message: 'categorys recipes fetched successfully',category: category.recipes },
        { status: 200 }
      );
    } catch (error) {
      console.error('Error fetching user and recipes by categoryName:', error);
  
      return NextResponse.json(
        { error: 'Failed to fetch  recipes', details: error.message },
        { status: 500 }
      );
    }
  }