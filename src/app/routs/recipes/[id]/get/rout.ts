// import { NextRequest, NextResponse } from "next/server";
// import connectDb from '@/app/lib/db/mongodb'
// import recipeSchema from '@/app/lib/models/Recipe'

// export async function GET(
//     req: NextRequest,
//     { params }: { params: { id: string } }
// ) {
//     try {
//         await connectDb();
//         const recipe = await recipeSchema.findById(params.id);

//         if (!recipe) {
//             return NextResponse.json({ error: 'user not found' }, { status: 404 });
//         }
//         return 
//     }

// }