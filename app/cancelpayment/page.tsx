import orderModel from "../_mongodb/models/orderModel";
import CancelUI from "./_components/CancelUI";

type searchParams = Record<"orderNumber", string>;

interface PageProps {
  searchParams: Promise<searchParams>;
}

async function Page({ searchParams }: PageProps) {
  const SearchParams = await searchParams;
  const orderNumber = SearchParams.orderNumber || "";
  let order = await orderModel.findOne({ orderNumber });
  if (!order)
    return (
      <div className="outer-layout-stripe-redirect">
        <div className="inner-layout-stripe-redirect bg-red-50">
          <h1 className="text-2xl font-bold">Order not found</h1>
          <p className="text-lg">Order number: {orderNumber}</p>
        </div>
      </div>
    );
  if (order.orderStatus.status !== "pending")
    return (
      <div className="outer-layout-stripe-redirect">
        <div className="inner-layout-stripe-redirect bg-red-50">
          <h1 className="text-2xl font-bold">Order is already confirmed</h1>
          <p className="text-lg">Order number: {orderNumber}</p>
        </div>
      </div>
    );
  return <CancelUI orderNumber={orderNumber} />;
}

export default Page;
