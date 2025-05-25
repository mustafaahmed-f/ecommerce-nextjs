export async function getAllProducts({
  page = 1,
  size = 149,
  category = "",
  brand = "",
  model = "",
  sort = "",
  color = "",
  priceMin = undefined,
  priceMax = undefined,
}: {
  page?: number;
  size?: number;
  category?: string;
  brand?: string;
  model?: string;
  sort?: string;
  color?: string;
  priceMin?: number | undefined;
  priceMax?: number | undefined;
} = {}) {
  if (priceMin === undefined) priceMin = 0;
  if (priceMax === undefined) priceMax = 50000;
  const response: Response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/products?page=${page}&size=${size}&category=${category}&brand=${brand}&model=${model}&sort=${sort}&color=${color}&priceMin=${priceMin}&priceMax=${priceMax}`,
    { next: { revalidate: 1000 * 60 * 60 * 24 } },
  );
  const clonedResponse = await response.clone().json();

  if (!clonedResponse.success && clonedResponse.message === "No products found")
    return { ...clonedResponse, products: [] };

  if (!response.ok) {
    const errorText = await response.text();
    console.error("API Error:", errorText); // Log error in console
    throw new Error("Couldn't get products! " + errorText);
  }
  return response.json();
}

export async function getSingleProduct(id: number) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/product/${String(id)}`,
    { next: { revalidate: 3600 } },
  );

  const clonedResponse = await response.clone().json();

  if (!clonedResponse.success && clonedResponse.message === "Product not found")
    return { ...clonedResponse, product: null };

  if (!response.ok) {
    const errorText = await response.text();
    console.error("API Error:", errorText); // Log error in console
    throw new Error("Couldn't get the product !!");
  }

  return response.json();
}

// export async function addProduct(body: any) {
//   const newProduct = await fetch("https://fakestoreapi.in/api/products", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(body),
//   });

//   if (!newProduct.ok) throw new Error("Couldn't add product !!");

//   return newProduct.json();
// }

// export async function updateProduct(id: number) {
//   const updatedProduct = await fetch(
//     `https://fakestoreapi.in/api/products/${String(id)}`,
//     {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         model: "Apple vision pro Second Gen",
//         color: "Blue",
//         discount: 47,
//       }),
//     },
//   );

//   if (!updatedProduct.ok) throw new Error("Failed to update product !!");

//   return updatedProduct.json();
// }

// export async function deleteProduct(id: number) {
//   const response = await fetch(
//     `https://fakestoreapi.in/api/products/${String(id)}`,
//     {
//       method: "DELETE",
//     },
//   );

//   if (!response.ok) throw new Error("Failed to update product !!");

//   return response.json();
// }
