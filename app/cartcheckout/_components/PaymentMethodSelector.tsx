import { Label } from "@/app/_components/shadcn/label";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/app/_components/shadcn/radio-group";
import { useFormContext } from "@/app/_context/FormContext";

import { useState } from "react";

interface PaymentMethodSelectorProps {}

function PaymentMethodSelector({}: PaymentMethodSelectorProps) {
  const { setValue, trigger } = useFormContext();
  const { 0: currentSelection, 1: setCurrentSelection } = useState<
    "cash" | "card"
  >("cash");

  const handleValueChange = (value: string) => {
    setValue("paymentMethod", value as "cash" | "card");
    setCurrentSelection(value as "cash" | "card");
    trigger("paymentMethod");
  };

  return (
    <RadioGroup
      value={currentSelection}
      onValueChange={handleValueChange}
      className="flex flex-row gap-4"
      aria-label="Payment Method"
      name="payment-method"
    >
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="cash" id="cash" />
        <Label htmlFor="cash">Cash</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="card" id="card" />
        <Label htmlFor="card">Card</Label>
      </div>
    </RadioGroup>
  );
}

export default PaymentMethodSelector;
