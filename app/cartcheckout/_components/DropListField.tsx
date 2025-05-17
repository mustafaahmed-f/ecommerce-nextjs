import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { inputFieldType } from "../_types/inputFieldType";
import { useFormContext } from "@/app/_context/FormContext";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { get } from "lodash";
import {
  FieldValues,
  UseFormRegister,
  UseFormSetValue,
  UseFormTrigger,
  UseFormWatch,
} from "react-hook-form";

interface DropListFieldProps<T extends FieldValues> extends inputFieldType {
  register: UseFormRegister<T>;
  errors: any;
  watch: UseFormWatch<T>;
  setValue: UseFormSetValue<T>;
  trigger: UseFormTrigger<T>;
}

function DropListField<T extends FieldValues>({
  name,
  lable,
  fullWidth,
  required,
  placeholder,
  dependency,
  optionsMethod,
}: DropListFieldProps<T>) {
  const {
    setValue,
    watch,
    trigger,
    formState: { errors },
  } = useFormContext();
  const { 0: dropListOptions, 1: setDropListOptions } = useState<string[]>([]);
  const dependencyValue = dependency ? watch(dependency) : "";
  const fieldValue = watch(name);
  const queryKey = dependency
    ? ["dependency dropListOptions", dependencyValue]
    : ["dropListOptions", fieldValue];

  const errorObj = get(errors, name);

  const { data, isPending, isError, error } = useQuery({
    queryKey,
    queryFn: dependency
      ? () => optionsMethod!(dependencyValue as string)
      : () => optionsMethod!(),
  });

  useEffect(() => {
    if (data) {
      setDropListOptions(data);
      if (!data.includes(fieldValue as string)) {
        setValue(name, ""); // reset to empty if the current value is invalid
        trigger(name);
      }
    }
  }, [data, setDropListOptions, fieldValue, setValue, name, trigger]);

  const handleChange = (event: SelectChangeEvent) => {
    setValue(name, event.target.value as string);
    trigger(name);
  };

  return (
    <div
      className={`flex flex-col gap-1 ${fullWidth ? "col-span-2" : "col-span-1"}`}
    >
      <FormControl
        fullWidth={true}
        error={isError || !!errorObj}
        disabled={isPending}
        required={required}
        className={fullWidth ? "col-span-2" : "col-span-1"}
      >
        <InputLabel id="demo-simple-select-label">{lable}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={
            dropListOptions.includes(fieldValue as string)
              ? (fieldValue as string)
              : ""
          }
          label={lable}
          onChange={handleChange}
          size="small"
          className={fullWidth ? "col-span-2" : "col-span-1"}
          error={isError || !!errorObj}
          placeholder={placeholder}
          MenuProps={{ disableAutoFocusItem: true, disableAutoFocus: true }}
        >
          {dropListOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {isError && <p className="text-red-600">{error?.message}</p>}
      {!!errorObj && (
        <p className="mx-3 text-xs text-red-600">{errorObj.message}</p>
      )}
    </div>
  );
}

export default DropListField;
