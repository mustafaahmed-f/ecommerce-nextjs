import ExpandMoreIcon from "@/app/_icons/ExpandMoreIcon";
import { CartProduct } from "@/app/cart/_types/CartType";
import ShoppingItem from "@/app/cartcheckout/_components/ShoppingItem";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
interface OrderItemsAccordionProps {
  order: any;
}

function OrderItemsAccordion({ order }: OrderItemsAccordionProps) {
  return (
    <Accordion defaultExpanded>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography fontWeight={600}>Order Items</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <div className="space-y-4">
          {order.products.length === 0 && (
            <p className="text-center text-red-600">Order has no products</p>
          )}
          {order.products.map((item: CartProduct, index: number) => (
            <div key={item.productID}>
              <ShoppingItem
                // key={item.productID}
                {...item}
                isOrdered
                orderStatus={order.orderStatus.status}
                orderId={order._id}
              />
              {index === order.products.length - 1 ? null : <hr />}
            </div>
          ))}
        </div>
      </AccordionDetails>
    </Accordion>
  );
}

export default OrderItemsAccordion;
