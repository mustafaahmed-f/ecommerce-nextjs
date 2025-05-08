import { useFormContext } from "@/app/_context/FormContext";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useState } from "react";

interface PaymentMethodSelectorProps {}

function PaymentMethodSelector({}: PaymentMethodSelectorProps) {
  const { setValue, trigger } = useFormContext();
  const { 0: currentSelection, 1: setCurrentSelection } = useState<
    "cash" | "card"
  >("cash");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue("paymentMethod", event.target.value as "cash" | "card");
    setCurrentSelection(event.target.value as "cash" | "card");
    trigger("paymentMethod");
  };

  return (
    <FormControl>
      <RadioGroup
        row
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={currentSelection}
        onChange={handleChange}
      >
        <FormControlLabel value="cash" control={<Radio />} label="Cash" />
        <FormControlLabel value="card" control={<Radio />} label="Card" />
      </RadioGroup>
    </FormControl>
  );
}

export default PaymentMethodSelector;
