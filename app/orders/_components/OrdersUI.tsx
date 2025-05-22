"use client";

import ShadcnPagination from "@/app/_components/ShadcnPagination";
import OrdersTable from "./OrdersTable";

interface OrdersUIProps {
  orders: any;
}

function OrdersUI({ orders }: OrdersUIProps) {
  let count = Math.ceil(orders.totalOrders / 7);
  return (
    <div className="mx-auto min-w-[50%] px-4 py-8 sm:px-8">
      <h1 className="mb-14 text-4xl font-bold sm:text-5xl">Orders</h1>
      <OrdersTable orders={orders} />
      <ShadcnPagination count={count} />
    </div>
  );
}

export default OrdersUI;
