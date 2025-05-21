import { Input } from "@/app/_components/shadcn/input";
import {
  Control,
  Controller,
  FieldValues,
  UseFormRegister,
  UseFormSetValue,
  UseFormTrigger,
  UseFormWatch,
} from "react-hook-form";
import { inputFieldType } from "../_types/inputFieldType";

interface PhoneInputFieldProps<T extends FieldValues>
  extends inputFieldType<T> {
  register: UseFormRegister<T>;
  errors: any;
  watch: UseFormWatch<T>;
  setValue: UseFormSetValue<T>;
  trigger: UseFormTrigger<T>;
  control: Control<T>;
}

function PhoneInputField<T extends FieldValues>({
  name,
  lable,
  fullWidth,
  required,
  placeholder,
  control,
}: PhoneInputFieldProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      rules={required ? { required: "This field is required" } : {}}
      render={({ field, fieldState: { error } }) => (
        <div
          className={`flex flex-col items-start ${
            fullWidth ? "col-span-2" : "col-span-1"
          } w-full`}
        >
          <label
            htmlFor={name}
            className="mb-1 text-sm font-medium text-gray-700"
          >
            {lable}
            {required && <span className="ms-1 text-red-500">*</span>}
          </label>

          <Input
            id={name}
            type="text"
            placeholder={placeholder}
            value={field.value || ""}
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d*$/.test(value)) {
                field.onChange(value);
              }
            }}
            className={`w-full ${error ? "border-red-500" : ""}`}
          />

          {error && (
            <p className="mt-1 text-xs text-red-600">{error.message}</p>
          )}
        </div>
      )}
    />
  );
}

export default PhoneInputField;
