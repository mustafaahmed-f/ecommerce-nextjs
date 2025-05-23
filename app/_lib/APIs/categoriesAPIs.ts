import connectDB from "@/app/_mongodb/dbConnect";
import categoriesModel from "@/app/_mongodb/models/categoriesModel";

export async function getCategories() {
  // const response = await instance.get("/api/categories");
  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/categories`, {
    next: { revalidate: 3600 * 24 },
  });
  // console.log("response", response.data);
  if (!response.ok) throw new Error("Couldn't get categories !!");

  return response.json();
}

export async function getCategoriesFromDB() {
  await connectDB();
  const categories = await categoriesModel.find({}, "title"); // fetch only titles
  return categories.map((category) => category.title);
}
