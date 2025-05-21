import {
  Control,
  FieldValues,
  Path,
  UseFormRegister,
  UseFormSetValue,
  UseFormTrigger,
  UseFormWatch,
} from "react-hook-form";
import QuantityControl from "../[id]/_components/QuantityControl";
import { inputFieldType } from "../_types/inputFieldType";
import DropListField from "./DropListField";
import PhoneInputField from "./PhoneInputField";
import TextInputField from "./TextInputField";

interface FormRendererProps<T extends FieldValues> {
  fields: inputFieldType<T>[];
  register: UseFormRegister<T>;
  errors: any;
  watch: UseFormWatch<T>;
  setValue: UseFormSetValue<T>;
  trigger: UseFormTrigger<T>;
  control: Control<T>;
}

function FormRenderer<T extends FieldValues>({
  fields,
  watch,
  trigger,
  errors,
  setValue,
  register,
  control,
}: FormRendererProps<T>) {
  return (
    <div className="grid w-full grid-cols-2 gap-x-2 gap-y-3">
      {fields.map((field: inputFieldType<T>) => {
        switch (field.type) {
          case "dropdown":
            return (
              <DropListField<T>
                {...field}
                key={field.name}
                watch={watch}
                setValue={setValue}
                trigger={trigger}
                register={register}
                errors={errors}
              />
            );

          case "phone":
            return (
              <PhoneInputField<T>
                {...field}
                key={field.name}
                watch={watch}
                setValue={setValue}
                trigger={trigger}
                register={register}
                errors={errors}
                control={control}
              />
            );

          case "quantity":
            return (
              <QuantityControl<T>
                {...field}
                key={field.name}
                watch={watch}
                setValue={setValue}
                trigger={trigger}
                register={register}
                errors={errors}
              />
            );

          default:
            return (
              <TextInputField<T>
                {...field}
                key={field.name}
                watch={watch}
                setValue={setValue}
                trigger={trigger}
                register={register}
                errors={errors}
                isPassword={field.type === "password"}
              />
            );
        }
      })}
    </div>
  );
}

export default FormRenderer;
