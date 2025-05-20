import connectDB from "@/app/_mongodb/dbConnect";
import brandsModel from "@/app/_mongodb/models/brandsModel";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();
  const brands = await brandsModel.find();

  if (!brands.length) {
    return NextResponse.json(
      { success: false, error: "No brands found" },
      { status: 404 },
    );
  }
  let finalBrands = brands.map((brand) => brand.title);
  return NextResponse.json(
    { success: true, brands: finalBrands },
    { status: 200 },
  );
}
