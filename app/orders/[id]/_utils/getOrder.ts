import { instance } from "@/app/_lib/axiosInstance";
import { getAxiosErrMsg } from "@/app/_lib/getAxiosErrMsg";

export async function getOrder(id: string, token?: string) {
  try {
    // const response = await instance.get(`/api/order?orderId=${id}`, {
    //   headers: {
    //     Cookie: `next_ecommerce_token=${token}`,
    //   },
    // });
    // return response.data;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/order?orderId=${id}`,
      {
        next: { tags: [`order-${id}`] },
        headers: {
          Cookie: `next_ecommerce_token=${token}`,
        },
      },
    );

    const finalResponse = await response.json();
    if (finalResponse.success) {
      return finalResponse;
    } else {
      return { success: false, error: finalResponse.error };
    }
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
