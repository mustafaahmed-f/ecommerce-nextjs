import Link from "next/link";
import orderModel from "../_mongodb/models/orderModel";
import dynamic from "next/dynamic";
const SuccessUI = dynamic(() => import("./_components/SuccessUI"), {
  ssr: false,
});

type searchParams = Record<"orderNumber", string>;

interface PageProps {
  searchParams: searchParams;
}

async function Page({ searchParams }: PageProps) {
  console.log("Payment success page rendered !!");
  const SearchParams = searchParams;
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
  if (order.orderStatus.status === "pending")
    return (
      <div className="outer-layout-stripe-redirect">
        <div className="inner-layout-stripe-redirect bg-red-50">
          <h1 className="text-2xl font-bold">
            Order is still pending. Visit{" "}
            <Link href="/orders" className="text-sky-600 underline">
              Orders page
            </Link>{" "}
            and Proceed to payment please !!
          </h1>
          <p className="text-lg">Order number: {orderNumber}</p>
        </div>
      </div>
    );
  if (
    order.orderStatus.status !== "confirmed" &&
    order.orderStatus.status !== "pending"
  )
    return (
      <div className="outer-layout-stripe-redirect">
        <div className="inner-layout-stripe-redirect bg-red-50">
          <h1 className="text-2xl font-bold">Please check your order status</h1>
          <p className="text-lg">Order number: {orderNumber}</p>
          <Link
            href="/orders"
            className="mt-6 rounded-lg bg-red-600 px-4 py-2 text-white transition hover:bg-red-700"
          >
            Go to Orders Page
          </Link>
        </div>
      </div>
    );
  return <SuccessUI orderNumber={orderNumber} />;
}

export default Page;
