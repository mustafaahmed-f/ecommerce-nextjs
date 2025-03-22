import { apiFeatures } from "@/app/_lib/apiFeatures";
import productsModel from "@/app/_mongodb/models/productsModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = searchParams.get("page") ?? "1";
  const size = searchParams.get("size") ?? "149";
  const category = searchParams.get("category");

  const brand = searchParams.get("brand");
  const model = searchParams.get("model");
  const sort = searchParams.get("sort");
  const color = searchParams.get("color");
  const priceMin = searchParams.get("priceMin");
  const priceMax = searchParams.get("priceMax");

  let filter: any = {};
  if (category) filter.category = category; // Directly filtering by category name
  if (brand) filter.brand = { $in: brand.split("/") }; // Filtering by multiple brand names
  if (color) filter.color = { $in: color.split("/") };
  if (priceMin) filter.price = { ...filter.price, $gte: parseFloat(priceMin) };
  if (priceMax) filter.price = { ...filter.price, $lte: parseFloat(priceMax) };

  const totalProducts = await productsModel.countDocuments(filter);

  const queryObj = {
    page: parseInt(page),
    size: parseInt(size),
    brand,
    model,
    sort,
    color,
    priceMin,
    priceMax,
  };

  const apiFeatureInstance = new apiFeatures(
    productsModel.find(filter).select("+rating"),
    queryObj,
  )
    .pagination()
    .sort();

  const products = await apiFeatureInstance.query;

  if (!products.length) {
    return NextResponse.json(
      { success: false, message: "No products found" },
      { status: 404 },
    );
  }
  return NextResponse.json(
    { success: true, products, totalProducts },
    {
      status: 200,
    },
  );
}
