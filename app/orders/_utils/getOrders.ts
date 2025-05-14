export async function getOrders({
  page = 1,
  status = null,
}: {
  page: number;
  status: string | null;
}) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/order/getOrders?page=${page}&status=${status}`,
    );

    const finalResponse = await response.json();

    if (finalResponse.success) {
      return finalResponse.orders;
    } else {
      return { success: false, error: finalResponse.error };
    }
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
