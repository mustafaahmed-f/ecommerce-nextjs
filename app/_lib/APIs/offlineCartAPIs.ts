import { instance } from "../axiosInstance";

let mainURL = `${process.env.NEXT_PUBLIC_API_URL}/api/offlineCart`;

export async function getOfflineCart(cartId: string) {
  const params = new URLSearchParams();
  params.append("cartId", cartId);
  const response = await instance.get(`${mainURL}?${params.toString()}`);
  return response.data;
}

export async function createOfflineCart() {
  const response = await instance.post(`${mainURL}`);
  return response.data;
}

export async function addToOfflineCart(cartId: string, productId: string) {
  const params = new URLSearchParams();
  params.append("productId", productId);
  const response = await instance.post(
    `${mainURL + "/AddToCart"}?${params.toString()}`,
  );
  console.log("Response : ", response);
  return response.data;
}

export async function updateProductQuantityOfOfflineCart(
  cartId: string,
  productId: string,
  quantity: number,
) {
  const params = new URLSearchParams();
  params.append("cartId", cartId);
  params.append("productId", productId);
  const response = await instance.patch(
    `${mainURL + "/updateQuantity"}?${params.toString()}`,
    {
      quantity,
    },
  );
  return response.data;
}

export async function removeFromOfflineCart(cartId: string, productId: string) {
  const params = new URLSearchParams();
  params.append("cartId", cartId);
  params.append("productId", productId);
  const response = await instance.patch(
    `${mainURL + "/RemoveFromCart"}?${params.toString()}`,
  );
  return response.data;
}

export async function emptyOfflineCart(cartId: string) {
  const params = new URLSearchParams();
  params.append("cartId", cartId);
  const response = await instance.patch(
    `${mainURL + "/EmptyCart"}?${params.toString()}`,
  );
  return response.data;
}
