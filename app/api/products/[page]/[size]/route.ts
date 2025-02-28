import { apiFeatures } from "@/app/_lib/apiFeatures";
import productsModel from "@/app/_mongodb/models/productsModel";
import { NextRequest, NextResponse } from "next/server";

// Cache key (for Next.js caching)
const revalidateTime = 3600 * 24; // 24 hours

export async function GET(
  request: NextRequest,
  {
    params,
  }: {
    params: Promise<{ page: string; size: string }>;
  }
) {
  const { page, size } = await params;
  const searchParams = request.nextUrl.searchParams;
  const brand = searchParams.get("brand");
  const model = searchParams.get("model");
  const sort = searchParams.get("sort");
  const color = searchParams.get("color");
  const price = searchParams.get("price");

  const queryObj = {
    page: parseInt(page),
    size: parseInt(size),
    brand,
    model,
    sort,
    color,
    price,
  };

  const apiFeatureInstance = new apiFeatures(productsModel.find(), queryObj)
    .pagination()
    .sort();
  // .filter();

  const products = await apiFeatureInstance.query;

  // let tempProducts = await productsModel.find();

  // console.log("tempProducts", tempProducts.length);

  if (!products.length) {
    return NextResponse.json(
      { success: false, error: "No products found" },
      { status: 404 }
    );
  }

  return NextResponse.json(
    { success: true, products },
    {
      status: 200,
      headers: {
        "Cache-Control": `s-maxage=${revalidateTime}, stale-while-revalidate`,
      },
    }
  );
}
