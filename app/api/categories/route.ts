import categoriesModel from "@/app/_mongodb/models/categoriesModel";
import { NextResponse } from "next/server";

export async function GET() {
  const categories = await categoriesModel.find();

  if (!categories.length) {
    return NextResponse.json(
      { success: false, error: "No categories found" },
      { status: 404 }
    );
  } else {
    let finalCategories = categories.map((category) => category.title);
    return NextResponse.json(
      { success: true, categories: finalCategories },
      { status: 200 }
    );
  }
}
