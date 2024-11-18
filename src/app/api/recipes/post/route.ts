
import { NextRequest, NextResponse } from 'next/server';
import connectDb from '@/app/lib/db/connectDb';
import { Recipe } from '@/app/lib/models/Recipe';
import { Category } from '@/app/lib/models/Category';

// export async function POST(req: NextRequest) {
//   try {

//     const { image, name, categoryName, ingredients, favorite, preparationInstructions } = await req.json();

//     if (!image || !name || !categoryName || !ingredients || favorite === undefined || !preparationInstructions) {
//       console.log("lllllllllllll", image, name, categoryName, ingredients, favorite, preparationInstructions);

//       return NextResponse.json(
//         { error: 'Missing required fields' },
//         { status: 400 }
//       );
//     }

//     await connectDb();


//     let category = await Category.findOne({ categoryName: categoryName });

//     if (!category) {
//       category = new Category({ categoryName: categoryName, recipes: [] });
//       await category.save();
//     }

//     const newRecipe = new Recipe({
//       image,
//       name,
//       categoryName,
//       ingredients,
//       favorite,
//       preparationInstructions
//     });

//     await newRecipe.save();

//     await Category.findOneAndUpdate(
//       { _id: category._id },
//       { $push: { recipes: newRecipe._id } },
//       { new: true }
//     );

//     return NextResponse.json(
//       { message: 'Recipe created successfully', recipe: newRecipe },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error('Error creating Recipe:', error);
//     return NextResponse.json(
//       { error: 'Failed to create Recipe', details: error },
//       { status: 500 }
//     );
//   }
// }
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
    let category = await Category.findOne({ categoryName: categoryName });

    // let category = await Category.findOne({ categoryName });

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
  } catch (error: any) {
    if (error.code === 11000) {
      // Handle duplicate key error
      return NextResponse.json(
        { error: 'Recipe with this name already exists' },
        { status: 400 }
      );
    }
    console.error('Error creating Recipe:', error);
    return NextResponse.json(
      { error: 'Failed to create Recipe', details: error },
      { status: 500 }
    );
  }
}