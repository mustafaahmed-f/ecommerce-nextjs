import { useFormContext } from "@/app/_context/FormContext";
import { fieldsObject } from "../_utils/fieldsObject";
import FormSection from "./FormSection";
import { match } from "ts-pattern";
import { singleCheckOutFields } from "../[id]/_utils/singleCheckOutFields";

interface FormSectionsProps {}

const sections: string[] = ["Customer Information", "Shipping Information"];

function FormSections({}: FormSectionsProps) {
  const { watch } = useFormContext();
  let finalFieldsObject = match(watch("isFromCart"))
    .with(true, () => fieldsObject)
    .otherwise(() => singleCheckOutFields);

  const customerSection = finalFieldsObject.slice(0, 3);
  const shippingSection = finalFieldsObject.slice(3);
  return (
    <div className="flex flex-col gap-5 sm:gap-8">
      <FormSection fields={customerSection} title={sections[0]} />
      <FormSection fields={shippingSection} title={sections[1]} />
    </div>
  );
}

export default FormSections;
