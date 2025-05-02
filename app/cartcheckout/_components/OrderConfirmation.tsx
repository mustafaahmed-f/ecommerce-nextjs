import { useFormContext } from "@/app/_context/FormContext";

interface OrderConfirmationProps {}

function OrderConfirmation({}: OrderConfirmationProps) {
  const { watch, setValue } = useFormContext();
  return <div></div>;
}

export default OrderConfirmation;
