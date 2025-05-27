import { withMiddleWare } from "@/app/_lib/withMiddleWare";
import connectDB from "@/app/_mongodb/dbConnect";
import productsModel from "@/app/_mongodb/models/productsModel";
import { NextRequest, NextResponse } from "next/server";

export const GET = withMiddleWare({
  applyAuth: false,
  middleWares: [],
  handler: async (request: NextRequest) => {
    await connectDB();
    try {
      const searchParams = request.nextUrl.searchParams;
      const productId = searchParams.get("productId");
      const product = await productsModel.findOne({ productId: productId });
      if (!product) throw new Error("Product not found !!", { cause: 404 });
      return NextResponse.json(
        { success: true, stock: product.stock },
        { status: 200 },
      );
    } catch (error: any) {
      return NextResponse.json(
        { success: false, error: error?.message },
        { status: error.cause || 500 },
      );
    }
  },
});
