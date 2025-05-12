import { CartProduct } from "@/app/cart/_types/CartType";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import Image from "next/image";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ShoppingItem from "@/app/cartcheckout/_components/ShoppingItem";
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
              <ShoppingItem key={item.productID} {...item} isOrdered />
              {index === order.products.length - 1 ? null : <hr />}
            </>
          ))}
        </div>
      </AccordionDetails>
    </Accordion>
  );
}

export default OrderItemsAccordion;
