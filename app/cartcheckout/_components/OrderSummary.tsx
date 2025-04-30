import { UseFormWatch } from "react-hook-form";
import { CheckOutFormValues } from "./CheckoutFormTemplate";
import { ICart } from "@/app/cart/_types/CartType";

interface OrderSummaryProps {
  watch: UseFormWatch<CheckOutFormValues>;
  cart: ICart;
}

function OrderSummary({ watch, cart }: OrderSummaryProps) {
  return (
    <div className="bg-[#E9E9E9] px-10 py-5 max-sm:-mx-7 sm:w-full">
      <h3 className="text-base font-semibold">Order Summary</h3>
    </div>
  );
}

export default OrderSummary;
