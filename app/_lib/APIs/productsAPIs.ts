export async function getAllProducts({
  page = 1,
  size = 149,
}: { page?: number; size?: number } = {}) {
  const response: any = await fetch(
    `${process.env.NEXTAUTH_URL}/api/products/${page}/${size}`,
    // { next: { revalidate: 3600 * 24 } }
    { next: { revalidate: 3600 * 24 } }
  );

  if (!response.ok) throw new Error("Couldn't get products !!");

  return response.json();
}

// TODO : Update all these APIs to use api routes created in the app that depends on mongoDB

export async function getSingleProduct(id: number) {
  const response = await fetch(
    `https://fakestoreapi.in/api/products/${String(id)}`
  );
  if (!response.ok) throw new Error("Couldn't get the product !!");

  return response.json();
}

export async function getProductsWithPagination({
  page = 1,
  limit = 20,
}: {
  page: number;
  limit: number;
}) {
  const response = await fetch(
    `https://fakestoreapi.in/api/products?page=${String(page)}&limit=${String(
      limit
    )}`
  );
  if (!response.ok) throw new Error("Couldn't get products !!");

  return response.json();
}

export async function addProduct(body: any) {
  const newProduct = await fetch("https://fakestoreapi.in/api/products", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!newProduct.ok) throw new Error("Couldn't add product !!");

  return newProduct.json();
}

export async function updateProduct(id: number) {
  const updatedProduct = await fetch(
    `https://fakestoreapi.in/api/products/${String(id)}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "Apple vision pro Second Gen",
        color: "Blue",
        discount: 47,
      }),
    }
  );

  if (!updatedProduct.ok) throw new Error("Failed to update product !!");

  return updatedProduct.json();
}

export async function deleteProduct(id: number) {
  const response = await fetch(
    `https://fakestoreapi.in/api/products/${String(id)}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) throw new Error("Failed to update product !!");

  return response.json();
}
