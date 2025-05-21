import { getFullAddress } from "@/app/_lib/getAddress";
import { getErrObject } from "@/app/_lib/getErrObj";
import { TextField } from "@mui/material";
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
import { Button } from "@/app/_components/shadcn/button";

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
      <TextField
        label={lable}
        variant="outlined"
        placeholder={placeholder}
        fullWidth={fullWidth}
        required={required}
        type={isPassword && !showPass ? "password" : "text"}
        {...register(name)}
        value={watchedValue || ""} // Force value, fallback to empty string
        onChange={(e) =>
          setValue(name, e.target.value as PathValue<T, typeof name>, {
            shouldValidate: true,
          })
        }
        className="w-full"
        size="small"
        helperText={errorObj?.message}
        error={!!errorObj}
      />
      {isPassword && name !== "rePassword" && (
        <div className="flex items-center gap-1 px-2 py-1">
          <input
            type="checkbox"
            onChange={(e) => setShowPass(e.target.checked)}
          />
          <span>Show password</span>
        </div>
      )}
    </div>
  ) : (
    <div className="col-span-2 grid w-full grid-cols-1 gap-1 max-md:mb-2 max-sm:grid-rows-2 md:grid-cols-[3fr_1fr]">
      <TextField
        label={lable}
        variant="outlined"
        placeholder={placeholder}
        fullWidth={fullWidth}
        required={required}
        {...register(name)}
        value={watchedValue || ""} // Force value, fallback to empty string
        onChange={(e) =>
          setValue(name, e.target.value as PathValue<T, typeof name>, {
            shouldValidate: true,
          })
        }
        className={"col-span-1"}
        size="small"
        helperText={errorObj?.message}
        error={!!errorObj}
      />

      <Button
        variant="default"
        onClick={async () => {
          const { address } = await getFullAddress();
          setValue(name, address as PathValue<T, typeof name>);
          trigger(name);
        }}
        size={"default"}
        className="min-h-10"
      >
        Get Address
      </Button>
    </div>
  );
}

export default TextInputField;
