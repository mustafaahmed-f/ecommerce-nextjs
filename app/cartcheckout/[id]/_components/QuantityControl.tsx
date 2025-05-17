import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import { IconButton, Stack, TextField } from "@mui/material";
import { get } from "lodash";
import {
  FieldValues,
  Path,
  PathValue,
  UseFormRegister,
  UseFormSetValue,
  UseFormTrigger,
  UseFormWatch,
} from "react-hook-form";
import { inputFieldType } from "../../_types/inputFieldType";

interface QuantityControlProps<T extends FieldValues>
  extends inputFieldType<T> {
  register: UseFormRegister<T>;
  errors: any;
  watch: UseFormWatch<T>;
  setValue: UseFormSetValue<T>;
  trigger: UseFormTrigger<T>;
}

function QuantityControl<T extends FieldValues>({
  name,
  lable,
  required,
  placeholder,
  register,
  errors,
  watch,
  setValue,
  trigger,
}: QuantityControlProps<T>) {
  const errObj = get(errors, name);
  //TODO : check stock before increment or decrement;
  function set<P extends Path<T>>(path: P, value: PathValue<T, P>) {
    setValue(path, value);
  }

  const quantityValue = watch("products.0.quantity" as Path<T>);

  function handlePaymentChange(quantity: number) {
    let finalSubTotal =
      quantity *
      (watch("products.0.unitPaymentPrice" as Path<T>) -
        watch("products.0.discount" as Path<T>));
    let finalPayment =
      watch("finalPaidAmount" as Path<T>) -
      watch("subTotal" as Path<T>) +
      finalSubTotal;
    set("subTotal" as Path<T>, finalSubTotal as PathValue<T, Path<T>>);
    set("finalPaidAmount" as Path<T>, finalPayment as PathValue<T, Path<T>>);
    trigger("subTotal" as Path<T>);
    trigger("finalPaidAmount" as Path<T>);
  }

  const handleIncrement = () => {
    set(
      "products.0.quantity" as Path<T>,
      (quantityValue + 1) as PathValue<T, Path<T>>,
    );
    handlePaymentChange(quantityValue + 1);
    trigger("products.0.quantity" as Path<T>);
  };

  const handleDecrement = () => {
    if (quantityValue === 1) return;
    set(
      "products.0.quantity" as Path<T>,
      (quantityValue - 1) as PathValue<T, Path<T>>,
    );
    handlePaymentChange(quantityValue - 1);
    trigger("products.0.quantity" as Path<T>);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "" || e.target.value === "0") return;
    set(
      "products.0.quantity" as Path<T>,
      parseInt(e.target.value) as PathValue<T, Path<T>>,
    );
    handlePaymentChange(parseInt(e.target.value));
    trigger("products.0.quantity" as Path<T>);
  };

  return (
    <div className="col-span-2 my-2 flex justify-start">
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
                maxWidth: "fit-content",
                width: "50px",
              },
              //// Remove control buttons:
              ".MuiInputAdornment-root": {
                display: "none",
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
