import { apiFeatures } from "@/app/_lib/apiFeatures";
import connectDB from "@/app/_mongodb/dbConnect";
import productsModel from "@/app/_mongodb/models/productsModel";
import { NextRequest, NextResponse } from "next/server";

const nestedFields = ["brand", "category", "model"];

export async function GET(request: NextRequest) {
  await connectDB();
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

  let modifiedSort = sort;
  if (modifiedSort) {
    let sortArr = modifiedSort.split("/");
    modifiedSort = sortArr
      .map((sortItem) => {
        if (sortItem.startsWith("-")) {
          let currentSortItem = sortItem.slice(1);
          if (nestedFields.includes(currentSortItem)) {
            return `-${currentSortItem}.title`;
          } else {
            return `-${currentSortItem}`;
          }
        } else {
          if (nestedFields.includes(sortItem)) {
            return `${sortItem}.title`;
          } else {
            return `${sortItem}`;
          }
        }
      })
      .join("/");
  }

  let filter: any = {};
  if (category) filter["category.title"] = category; // Directly filtering by category name
  if (brand) filter["brand.title"] = { $in: brand.split("/") };
  if (color) filter.color = { $in: color.split("/") };
  if (priceMin) filter.price = { ...filter.price, $gte: parseFloat(priceMin) };
  if (priceMax) filter.price = { ...filter.price, $lte: parseFloat(priceMax) };

  const totalProducts = await productsModel.countDocuments(filter);

  const queryObj = {
    page: parseInt(page),
    size: parseInt(size),
    brand,
    model,
    sort: modifiedSort,
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

  let finalProducts = products.map((product: any) => {
    product = product.toObject();
    return {
      ...product,
      brand: product.brand.title,
      category: product.category.title,
      model: product.model.title,
    };
  });

  return NextResponse.json(
    { success: true, products: finalProducts, totalProducts },
    {
      status: 200,
    },
  );
}
