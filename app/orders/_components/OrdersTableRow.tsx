import { Chip } from "@mui/material";
import dayjs from "dayjs";
import Link from "next/link";
import { getChipColors } from "../_utils/getChipColors";

interface OrdersTableRowProps {
  order: any;
}

function OrdersTableRow({ order }: OrdersTableRowProps) {
  return (
    <div className="orders-table-cols px-2 py-2 text-center">
      <Link
        href={`/orders/${order._id}`}
        className="text-sky-500 underline hover:text-sky-600"
      >
        {String(order.orderNumber).padStart(6, "0")}
      </Link>
      <span>{order.userInfo.firstName + " " + order.userInfo.lastName}</span>
      <span>{dayjs(order.createdAt).format("MMM D, YYYY - h:mm A")}</span>
      <span>
        <Chip
          label={order.orderStatus.status}
          className={`border text-sm capitalize`}
          size="small"
          style={{
            color: getChipColors(order.orderStatus.status).text,
            backgroundColor: getChipColors(order.orderStatus.status).bg,
            borderColor: getChipColors(order.orderStatus.status).border,
          }}
        />
      </span>
      <span>{order.products.length} items</span>
      <span>$ {order.finalPaidAmount.toFixed(2)}</span>
    </div>
  );
}

export default OrdersTableRow;
