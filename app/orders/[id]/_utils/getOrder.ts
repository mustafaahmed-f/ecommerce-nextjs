import { instance } from "@/app/_lib/axiosInstance";
import { getAxiosErrMsg } from "@/app/_lib/getAxiosErrMsg";

export async function getOrder(id: string, token?: string) {
  try {
    const response = await instance.get(`/api/order?orderId=${id}`, {
      headers: {
        Cookie: `next_ecommerce_token=${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    const errorMsg = getAxiosErrMsg(error);
    return { success: false, error: errorMsg };
  }
}
