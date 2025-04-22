import { ICart } from "@/app/cart/_types/CartType";
import { instance } from "../axiosInstance";

let mainURL = `${process.env.NEXT_PUBLIC_API_URL}/api/cart`;

export async function getUserCart(cookieHeader: any) {
  const response = await instance.get(`${mainURL}`, { headers: cookieHeader });
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
  const response = await instance.patch(
    `${mainURL + "/removeFromCart"}?${params.toString()}`,
  );
  return response.data;
}

export async function emptyUserCart(cartId: string) {
  const params = new URLSearchParams();
  params.append("cartId", cartId);
  const response = await instance.patch(
    `${mainURL + "/emptyCart"}?${params.toString()}`,
  );
  return response.data;
}

export async function mergeCarts(
  cartId: string,
  mergedCart: ICart,
  cookieHeader: any,
) {
  const params = new URLSearchParams();
  params.append("cartId", cartId);
  const response = await instance.patch(
    `${mainURL + "/afterMerge"}`,
    { mergedCart },
    {
      headers: cookieHeader,
    },
  );
  return response.data;
}
