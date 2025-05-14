import { cookies } from "next/headers";
import { getOrders } from "./_utils/getOrders";
import OrdersUI from "./_components/OrdersUI";

interface PageProps {
  searchParams: Promise<{
    page?: string;
    status?: string;
  }>;
}

async function Page(props: PageProps) {
  const searchParams = await props.searchParams;
  const page = searchParams.page ?? "1";
  const status =
    !searchParams.status || searchParams.status === ""
      ? null
      : searchParams.status;
  console.log("status : ", status);
  const token = cookies().get("next_ecommerce_token")?.value;
  const orders = await getOrders({ page, status, token: token! });

  return <OrdersUI orders={orders} />;
}

export default Page;
