import connectDB from "@/app/_mongodb/dbConnect";
import categoriesModel from "@/app/_mongodb/models/categoriesModel";
import { getAxiosErrMsg } from "../getAxiosErrMsg";

export async function getCategories() {
  const baseUrl =
    process.env.NEXT_PUBLIC_API_URL ||
    process.env.NEXTAUTH_URL ||
    "http://localhost:3001";

  try {
    const response = await fetch(
      new URL("/api/categories", baseUrl).toString(),
      {
        next: { revalidate: 0 },
      },
    );

    if (!response.ok) {
      const message = await response.text();
      throw new Error(`Couldn't get categories: ${message}`);
    }

    const categories = await response.json();
    return categories;
  } catch (error: any) {
    const ErrMsg = getAxiosErrMsg(error);
    console.log("Error fetching categories from API: ", ErrMsg);
    return {
      success: false,
      categories: [],
      error: ErrMsg ?? error?.message ?? "Unknown error",
    };
  }
}

export async function getCategoriesFromDB() {
  await connectDB();
  const categories = await categoriesModel.find();
  return categories.map((category) => category.title);
}
