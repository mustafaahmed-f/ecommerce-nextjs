import { instance } from "../axiosInstance";

export async function getCategories() {
  // const response = await instance.get("/api/categories");
  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/categories`, {
    cache: "force-cache",
  });
  // console.log("response", response.data);
  if (!response.ok) throw new Error("Couldn't get categories !!");

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
