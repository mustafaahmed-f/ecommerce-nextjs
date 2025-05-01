import { useFormContext } from "@/app/_context/FormContext";
import { Button, TextField } from "@mui/material";
import { get } from "lodash";
import { inputFieldType } from "../_types/inputFieldType";
import { getFullAddress } from "@/app/_lib/getAddress";

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
    trigger,
    setValue,
    watch,
  } = useFormContext();

  const errorObj = get(errors, name);

  return name !== "userInfo.address" ? (
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
  ) : (
    <div className="col-span-2 grid w-full grid-cols-1 gap-1 max-md:mb-2 max-sm:grid-rows-2 md:grid-cols-[3fr_1fr]">
      <TextField
        label={lable}
        variant="outlined"
        placeholder={placeholder}
        fullWidth={fullWidth}
        required={required}
        value={watch(name)}
        {...register(name)}
        className={"col-span-1"}
        size="small"
        helperText={errorObj?.message}
        error={!!errorObj}
      ></TextField>
      <Button
        color="inherit"
        variant="contained"
        onClick={async () => {
          const { address } = await getFullAddress();
          setValue(name, address);
          trigger(name);
        }}
        className="text-xs max-sm:text-sm"
        sx={{ width: "100%", fontSize: "14px" }}
      >
        Get Address
      </Button>
    </div>
  );
}

export default TextInputField;
