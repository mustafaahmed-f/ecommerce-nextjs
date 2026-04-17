function getServerBaseUrl() {
  if (typeof window !== "undefined") return "";

  if (process.env.NEXTAUTH_URL) {
    return process.env.NEXTAUTH_URL;
  }

  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }

  return "http://localhost:3000";
}

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
  fromProvider,
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
  fromProvider?: boolean; //* This is used for debugging to know if the current call is from the provider or not
} = {}) {
  try {
    if (priceMin === undefined) priceMin = 0;
    if (priceMax === undefined) priceMax = 50000;
    const baseUrl = getServerBaseUrl();
    const response: Response = await fetch(
      `${baseUrl}/api/products?page=${page}&size=${size}&category=${category}&brand=${brand}&model=${model}&sort=${sort}&color=${color}&priceMin=${priceMin}&priceMax=${priceMax}`,
      { next: { revalidate: 1000 * 60 * 60 * 24 } },
      // { next: { revalidate: 0 } },
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("API Error:", errorText); // Log error in console
      throw new Error("Couldn't get products! " + errorText);
    }

    const finalResponse = await response.json();
    if (!finalResponse.success) {
      if (finalResponse.message === "No products found")
        return { ...finalResponse, error: "No products found", products: [] };
      throw new Error(finalResponse.message);
    }
    return finalResponse;
  } catch (error: any) {
    console.log(error);
    return { success: false, error: error.message, products: [] };
  }
}

export async function getSingleProduct(id: number) {
  const baseUrl = getServerBaseUrl();
  const response = await fetch(`${baseUrl}/api/product/${String(id)}`, {
    next: { revalidate: 0 },
  });

  const clonedResponse = await response.clone().json();

  if (!clonedResponse.success && clonedResponse.message === "Product not found")
    return { ...clonedResponse, product: null };

  if (!response.ok) {
    const errorText = await response.text();
    console.error("API Error:", errorText); // Log error in console
    throw new Error("Couldn't get the product !!");
  }
  const finalResponse = await response.json();
  return finalResponse;
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
