import { useFormContext } from "@/app/_context/FormContext";
import { inputFieldType } from "../_types/inputFieldType";
import FormRenderer from "./FormRenderer";
import { CheckOutFormValues } from "./CheckoutFormTemplate";

interface FormSectionProps {
  fields: inputFieldType<CheckOutFormValues>[];
  title: string;
}

function FormSection({ fields, title }: FormSectionProps) {
  const {
    setValue,
    watch,
    trigger,
    register,
    formState: { errors },
    control,
  } = useFormContext();
  return (
    <div>
      <h3 className="mb-2 text-xl font-semibold sm:mb-4">{title}</h3>
      <FormRenderer<CheckOutFormValues>
        fields={fields}
        watch={watch}
        setValue={setValue}
        trigger={trigger}
        register={register}
        errors={errors}
        control={control}
      />
    </div>
  );
}

export default FormSection;
