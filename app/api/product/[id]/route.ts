import connectDB from "@/app/_mongodb/dbConnect";
import productsModel from "@/app/_mongodb/models/productsModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, props: any) {
  await connectDB();
  const params = await props.params;
  const product = await productsModel.findOne({ productId: params.id });
  if (!product) {
    return NextResponse.json(
      { success: false, message: "Product not found" },
      { status: 404 },
    );
  }
  return NextResponse.json({ success: true, product }, { status: 200 });
}
