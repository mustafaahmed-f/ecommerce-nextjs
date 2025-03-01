import { instance } from "../axiosInstance";

export async function getCategories() {
  // const response = await instance.get("/api/categories");
  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/categories`, {
    next: { revalidate: 3600 * 24 },
  });
  // console.log("response", response.data);
  if (!response.ok) throw new Error("Couldn't get categories !!");

  console.log("Categories Fetched !!");

  return response.json();
}

export async function getProductsByCategories(category: string) {
  const response = await fetch(
    `https://fakestoreapi.in/api/products/category?type=${category}`
  );

  if (!response.ok)
    throw new Error(`Couldn't get products of category ${category} !!`);

  return response.json();
}
