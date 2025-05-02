import { useFormContext } from "@/app/_context/FormContext";
import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import { IconButton, Stack, TextField } from "@mui/material";
import { get } from "lodash";
import { inputFieldType } from "../../_types/inputFieldType";

interface QuantityControlProps extends inputFieldType {}

function QuantityControl({
  name,
  lable,
  fullWidth,
  required,
  placeholder,
}: QuantityControlProps) {
  const {
    watch,
    setValue,
    trigger,
    register,
    formState: { errors },
  } = useFormContext();
  const errObj = get(errors, name);
  //TODO : check stock before increment or decrement;

  const quantityValue = watch("products.0.quantity");

  function handlePaymentChange(quantity: number) {
    let finalSubTotal =
      quantity *
      (watch("products.0.unitPaymentPrice") - watch("products.0.discount"));
    let finalPayment =
      watch("finalPaidAmount") - watch("subTotal") + finalSubTotal;
    setValue("subTotal", finalSubTotal);
    setValue("finalPaidAmount", finalPayment);
    trigger("subTotal");
    trigger("finalPaidAmount");
  }

  const handleIncrement = () => {
    setValue("products.0.quantity", quantityValue + 1);
    handlePaymentChange(quantityValue + 1);
    trigger("products.0.quantity");
  };

  const handleDecrement = () => {
    if (quantityValue === 1) return;
    setValue("products.0.quantity", quantityValue - 1);
    handlePaymentChange(quantityValue - 1);
    trigger("products.0.quantity");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue("products.0.quantity", parseInt(e.target.value));
    trigger("products.0.quantity");
  };

  return (
    <div className="col-span-2 flex justify-start">
      <div className="w-fit">
        <Stack direction="row" alignItems="center" spacing={1}>
          <IconButton onClick={handleDecrement}>
            <RemoveCircleOutline />
          </IconButton>
          <TextField
            {...register(name)}
            type="number"
            value={quantityValue}
            onChange={handleInputChange}
            size="small"
            error={!!errObj}
            helperText={errObj?.message}
            placeholder={placeholder}
            required={required}
            label={lable}
            sx={{
              input: {
                textAlign: "center",
                width: "fit-content",
                paddingInline: "10px",
              },
            }}
          />
          <IconButton onClick={handleIncrement}>
            <AddCircleOutline />
          </IconButton>
        </Stack>
      </div>
    </div>
  );
}

export default QuantityControl;
