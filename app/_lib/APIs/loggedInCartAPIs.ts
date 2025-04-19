import { instance } from "../axiosInstance";

let mainURL = `${process.env.NEXT_PUBLIC_API_URL}/api/cart`;

export async function getUserCart() {
  const response = await instance.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/cart`,
  );
  return response.data;
}

export async function addToUserCart(cartId: string, productId: string) {
  const params = new URLSearchParams();
  params.append("cartId", cartId);
  params.append("productId", productId);
  const response = await instance.post(`${mainURL}?${params.toString()}`);
  return response.data;
}

export async function updateProductQuantityOfUserCart(
  cartId: string,
  productId: string,
  quantity: number,
) {
  const params = new URLSearchParams();
  params.append("cartId", cartId);
  params.append("productId", productId);
  const response = await instance.patch(`${mainURL}?${params.toString()}`, {
    quantity,
  });
  return response.data;
}

export async function removeFromUserCart(cartId: string, productId: string) {
  const params = new URLSearchParams();
  params.append("cartId", cartId);
  params.append("productId", productId);
  const response = await instance.delete(
    `${mainURL + "/removeFromCart"}?${params.toString()}`,
  );
  return response.data;
}

export async function emtpyUserCart(cartId: string) {
  const params = new URLSearchParams();
  params.append("cartId", cartId);
  const response = await instance.delete(
    `${mainURL + "/emptyCart"}?${params.toString()}`,
  );
  return response.data;
}
