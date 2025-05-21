import { Button } from "@/app/_components/shadcn/button";
import { Input } from "@/app/_components/shadcn/input";
import { getFullAddress } from "@/app/_lib/getAddress";
import { getErrObject } from "@/app/_lib/getErrObj";
import { useState } from "react";
import {
  FieldValues,
  PathValue,
  UseFormRegister,
  UseFormSetValue,
  UseFormTrigger,
  UseFormWatch,
} from "react-hook-form";
import { inputFieldType } from "../_types/inputFieldType";

interface TextInputFieldProps<T extends FieldValues> extends inputFieldType<T> {
  register: UseFormRegister<T>;
  errors: any;
  watch: UseFormWatch<T>;
  setValue: UseFormSetValue<T>;
  trigger: UseFormTrigger<T>;
  isPassword?: boolean;
}

function TextInputField<T extends FieldValues>({
  name,
  lable,
  fullWidth,
  required,
  placeholder,
  register,
  trigger,
  setValue,
  watch,
  errors,
  isPassword = false,
}: TextInputFieldProps<T>) {
  const watchedValue: PathValue<T, typeof name> = watch(name);
  const errorObj = getErrObject<T>(errors, name);
  const [showPass, setShowPass] = useState(false);

  return name !== "userInfo.address" ? (
    <div
      className={`flex flex-col items-start ${fullWidth ? "col-span-2" : "col-span-1"} w-full`}
    >
      <label htmlFor={name} className="mb-1 text-sm font-medium text-gray-700">
        {lable}
        {required && <span className="ms-1 text-red-500">*</span>}
      </label>
      <Input
        id={name}
        type={isPassword && !showPass ? "password" : "text"}
        placeholder={placeholder}
        value={watchedValue || ""}
        onChange={(e) =>
          setValue(name, e.target.value as PathValue<T, typeof name>, {
            shouldValidate: true,
          })
        }
        className="w-full"
      />
      {errorObj && (
        <p className="mt-1 text-xs text-red-600">{errorObj.message}</p>
      )}

      {isPassword && name !== "rePassword" && (
        <div className="flex items-center gap-1 px-2 py-1">
          <input
            type="checkbox"
            id={`${name}-show-password`}
            onChange={(e) => setShowPass(e.target.checked)}
          />
          <label htmlFor={`${name}-show-password`} className="select-none">
            Show password
          </label>
        </div>
      )}
    </div>
  ) : (
    <div className="col-span-2 grid w-full grid-cols-1 gap-x-1 max-md:mb-2 max-sm:grid-rows-2 md:grid-cols-[3fr_1fr]">
      <div className="flex flex-col">
        <label
          htmlFor={name}
          className="mb-1 text-sm font-medium text-gray-700"
        >
          {lable}
          {required && <span className="ms-1 text-red-500">*</span>}
        </label>
        <Input
          id={name}
          placeholder={placeholder}
          value={watchedValue || ""}
          onChange={(e) =>
            setValue(name, e.target.value as PathValue<T, typeof name>, {
              shouldValidate: true,
            })
          }
          className="col-span-1 w-full"
        />
        {errorObj && (
          <p className="mt-1 text-xs text-red-600">{errorObj.message}</p>
        )}
      </div>

      <Button
        variant="default"
        onClick={async () => {
          const { address } = await getFullAddress();
          setValue(name, address as PathValue<T, typeof name>);
          trigger(name);
        }}
        size={"default"}
        className="self-end"
      >
        Get Address
      </Button>
    </div>
  );
}

export default TextInputField;
