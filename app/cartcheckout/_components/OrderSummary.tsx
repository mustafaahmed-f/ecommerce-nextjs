import { UseFormWatch } from "react-hook-form";
import { CheckOutFormValues } from "./CheckoutFormTemplate";
import { ICart } from "@/app/cart/_types/CartType";

interface OrderSummaryProps {
  watch: UseFormWatch<CheckOutFormValues>;
  cart: ICart;
}

function OrderSummary({ watch, cart }: OrderSummaryProps) {
  return <div className="w-full bg-[#E9E9E9]">Order summary</div>;
}

export default OrderSummary;
