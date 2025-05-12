import { useFormContext } from "@/app/_context/FormContext";
import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import { inputFieldType } from "../_types/inputFieldType";

interface PhoneInputFieldProps extends inputFieldType {}

function PhoneInputField({
  name,
  lable,
  fullWidth,
  required,
  placeholder,
}: PhoneInputFieldProps) {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      rules={required ? { required: true } : {}}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          value={field.value || ""}
          error={!!error}
          helperText={error?.message}
          label={lable}
          placeholder={placeholder}
          required={required}
          className={fullWidth ? "col-span-2" : "col-span-1"}
          variant="outlined"
          size="small"
          onChange={(e) => {
            // allow only digits
            const value = e.target.value;
            if (/^\d*$/.test(value)) {
              field.onChange(value);
            }
          }}
          sx={{
            input: {
              MozAppearance: "textfield",
              "&::-webkit-outer-spin-button": {
                WebkitAppearance: "none",
                margin: 0,
              },
              "&::-webkit-inner-spin-button": {
                WebkitAppearance: "none",
                margin: 0,
              },
            },
          }}
        />
      )}
    />
  );
}

export default PhoneInputField;
