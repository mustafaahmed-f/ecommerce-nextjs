import { useFormContext } from "@/app/_context/FormContext";
import { TextField } from "@mui/material";
import { get } from "lodash";
import { inputFieldType } from "../_types/inputFieldType";

interface TextInputFieldProps extends inputFieldType {}

function TextInputField({
  name,
  lable,
  fullWidth,
  required,
  placeholder,
}: TextInputFieldProps) {
  const {
    formState: { errors },
    register,
  } = useFormContext();

  const errorObj = get(errors, name);

  return (
    <TextField
      label={lable}
      variant="outlined"
      placeholder={placeholder}
      fullWidth={fullWidth}
      required={required}
      {...register(name)}
      className={fullWidth ? "col-span-2" : "col-span-1"}
      size="small"
      helperText={errorObj?.message}
      error={!!errorObj}
    ></TextField>
  );
}

export default TextInputField;
