import connectDB from "@/app/_mongodb/dbConnect";
import categoriesModel from "@/app/_mongodb/models/categoriesModel";
import { getAxiosErrMsg } from "../getAxiosErrMsg";

export async function getCategories() {
  // const response = await instance.get("/api/categories");
  // ALERT : Here i used static url so static pages can be generated on vercel
  try {
    const response = await fetch(
      `https://ecommerce-nextjs-by-mustafa.vercel.app/api/categories`,
      {
        next: { revalidate: 3600 * 24 },
      },
    );
    // console.log("response", response.data);
    if (!response.ok) throw new Error("Couldn't get categories !!");
    const categories = await response.json();
    return categories;
  } catch (error) {
    const ErrMsg = getAxiosErrMsg(error);
    console.log("Error fetching categories from API: ", ErrMsg);
  }
}

export async function getCategoriesFromDB() {
  await connectDB();
  const categories = await categoriesModel.find();
  return categories.map((category) => category.title);
}
