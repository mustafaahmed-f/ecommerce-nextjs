interface OrdersTableHeaderProps {}

const tableHeadLines = [
  "Order No.",
  "Customer",
  "Date",
  "Status",
  "No. of items",
  "Total",
];

function OrdersTableHeader({}: OrdersTableHeaderProps) {
  return (
    <div className="orders-table-cols bg-stone-100 px-2 py-1">
      {tableHeadLines.map((line, index) => (
        <span key={index} className="text-center font-semibold">
          {line}
        </span>
      ))}
    </div>
  );
}

export default OrdersTableHeader;
