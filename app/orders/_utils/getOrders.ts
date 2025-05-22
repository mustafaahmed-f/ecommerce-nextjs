import jwt, { JwtPayload } from "jsonwebtoken";

export async function getOrders({
  page = "1",
  status = null,
  token,
}: {
  page: string;
  status: string | null;
  token: string;
}) {
  try {
    const decoded = jwt.decode(token);
    const userId = (decoded as JwtPayload)?.id;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/order/getOrders?page=${page}&status=${status}`,
      {
        next: { tags: [`orders-${userId}`] },
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
