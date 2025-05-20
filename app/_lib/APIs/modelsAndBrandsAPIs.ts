import connectDB from "@/app/_mongodb/dbConnect";
import brandsModel from "@/app/_mongodb/models/brandsModel";

export async function getBrands() {
  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/brands`, {
    next: { revalidate: 3600 * 24 },
  });
  // console.log("response", response.data);
  if (!response.ok) throw new Error("Couldn't get brands !!");

  return response.json();
}

export async function getBrandsFromDB() {
  await connectDB();
  const brands = await brandsModel.find({}, "title");
  return brands.map((brand) => brand.title);
}
