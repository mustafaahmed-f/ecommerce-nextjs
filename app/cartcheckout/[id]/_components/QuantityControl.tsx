import { Input } from "@/app/_components/shadcn/input";
import AddCircleIcon from "@/app/_icons/AddCircleIcon";
import RemoveCircleIcon from "@/app/_icons/RemoveCircleIcon";
import { instance } from "@/app/_lib/axiosInstance";
import { getAxiosErrMsg } from "@/app/_lib/getAxiosErrMsg";
import { getErrObject } from "@/app/_lib/getErrObj";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
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
import SpinnerMini from "@/app/_components/SpinnerMini";

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
  const params = useParams();
  const productId = params.id;

  const { toast } = useToast();

  function set<P extends Path<T>>(path: P, value: PathValue<T, P>) {
    setValue(path, value);
  }

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["check stock", productId],
    queryFn: async () => {
      try {
        // await new Promise((r) => setTimeout(r, 2000));
        const response = await instance.get(
          `/api/getStock?productId=${productId}`,
        );
        return response.data;
      } catch (error) {
        const errMsg = getAxiosErrMsg(error);
        toast({
          title: "Error",
          description: errMsg,
          variant: "destructive",
        });
      }
    },
  });

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
    if (quantityValue >= data.stock) return;
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

    if (/^\d*$/.test(e.target.value)) {
      if (parseInt(e.target.value) > data.stock) return;
      set(
        "products.0.quantity" as Path<T>,
        parseInt(e.target.value) as PathValue<T, Path<T>>,
      );
      handlePaymentChange(parseInt(e.target.value));
      trigger("products.0.quantity" as Path<T>);
    }
  };

  return (
    <div className={`col-span-2 flex justify-start`}>
      <div className="flex w-fit flex-col gap-1">
        <label
          htmlFor={name}
          className="mb-1 text-sm font-medium text-gray-700"
        >
          {lable}
          {required && <span className="ms-1 text-red-500">*</span>}
        </label>
        <div className="flex items-center gap-4">
          <div
            className={`flex items-center gap-2 ${isPending ? "pointer-events-none opacity-40" : ""}`}
          >
            <span onClick={handleDecrement} className="cursor-pointer">
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
            <span onClick={handleIncrement} className="cursor-pointer">
              <AddCircleIcon />
            </span>
          </div>
          {isPending && <SpinnerMini />}
        </div>
        {!isPending && !isError && data && (
          <p className="mt-3 text-xs text-green-500">
            Available Stock: {data.stock}
          </p>
        )}
        {isError && (
          <p className="mt-3 text-xs text-red-500">* {error?.message}</p>
        )}
      </div>
    </div>
  );
}

export default QuantityControl;
