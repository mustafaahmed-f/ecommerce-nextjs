import { instance } from "../axiosInstance";

export async function getCategories() {
  const response = await instance.get("/api/categories");
  // console.log("response", response.data);
  if (!response.data || !response.data.success)
    throw new Error("Couldn't get categories !!");

  return response.data;
  // const finalResponse = response.data.categories.map(
  //   (category: any) => category.title
  // );
  // return finalResponse;
}

export async function getProductsByCategories(category: string) {
  const response = await fetch(
    `https://fakestoreapi.in/api/products/category?type=${category}`
  );

  if (!response.ok)
    throw new Error(`Couldn't get products of category ${category} !!`);

  return response.json();
}
