import OrdersTableHeader from "./OrdersTableHeader";
import OrdersTableRow from "./OrdersTableRow";

interface OrdersTableProps {
  orders: any;
}

function OrdersTable({ orders }: OrdersTableProps) {
  return (
    <div className="mt-12 min-w-[680px] overflow-x-auto">
      <OrdersTableHeader />
      {orders.orders.map((order: any) => (
        <OrdersTableRow key={order._id} order={order} />
      ))}
    </div>
  );
}

export default OrdersTable;
