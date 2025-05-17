"use client";

import ProductsPagination from "@/app/products/_components/ProductsPagination";
import OrdersTable from "./OrdersTable";

interface OrdersUIProps {
  orders: any;
}

function OrdersUI({ orders }: OrdersUIProps) {
  return (
    <div className="mx-auto min-w-[50%] px-4 py-8 sm:px-8">
      <h1 className="mb-14 text-4xl font-bold sm:text-5xl">Orders</h1>
      <OrdersTable orders={orders} />
      <ProductsPagination productsCount={orders.totalOrders} size={7} />
    </div>
  );
}

export default OrdersUI;
