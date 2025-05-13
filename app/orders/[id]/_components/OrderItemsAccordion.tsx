import { CartProduct } from "@/app/cart/_types/CartType";
import ShoppingItem from "@/app/cartcheckout/_components/ShoppingItem";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
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
          {order.products.map((item: CartProduct, index: number) => (
            <>
              <ShoppingItem
                key={item.productID}
                {...item}
                isOrdered
                orderStatus={order.orderStatus.status}
              />
              {index === order.products.length - 1 ? null : <hr />}
            </>
          ))}
        </div>
      </AccordionDetails>
    </Accordion>
  );
}

export default OrderItemsAccordion;
