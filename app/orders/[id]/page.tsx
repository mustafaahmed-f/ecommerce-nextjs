import { cookies } from "next/headers";
import SingleOrderPage from "./_components/SingleOrderPage";
import { getOrder } from "./_utils/getOrder";

interface PageProps {
  params: Promise<any>;
}

async function Page({ params }: PageProps) {
  const { id } = await params;
  const token = cookies().get("next_ecommerce_token")?.value;
  const order = await getOrder(id, token);
  if (order.success && !order.success)
    return (
      <div className="flex h-full w-full items-center justify-center py-24 text-xl text-red-500">
        <p>{order?.error ?? "Something went wrong"}</p>
      </div>
    );

  return <SingleOrderPage order={order.order} />;
}

export default Page;
