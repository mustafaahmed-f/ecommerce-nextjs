import { Input } from "@/app/_components/shadcn/input";
import AddCircleIcon from "@/app/_icons/AddCircleIcon";
import RemoveCircleIcon from "@/app/_icons/RemoveCircleIcon";
import { getErrObject } from "@/app/_lib/getErrObj";
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
  const errObj = getErrObject<T>(errors, name);
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
    <div className="col-span-2 flex justify-start">
      <div className="flex w-fit flex-col gap-1">
        <label
          htmlFor={name}
          className="mb-1 text-sm font-medium text-gray-700"
        >
          {lable}
          {required && <span className="ms-1 text-red-500">*</span>}
        </label>
        <div className="flex items-center gap-2">
          <span onClick={handleDecrement}>
            <RemoveCircleIcon />
          </span>
          <Input
            {...register(name)}
            id={name}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={quantityValue}
            onChange={handleInputChange}
            placeholder={placeholder}
            className={`w-[60px] text-center ${errObj ? "border-red-500" : ""}`}
          />
          <span onClick={handleIncrement}>
            <AddCircleIcon />
          </span>
        </div>
      </div>
    </div>
  );
}

export default QuantityControl;
