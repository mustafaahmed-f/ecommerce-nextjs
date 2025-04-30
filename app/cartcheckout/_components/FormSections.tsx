import { UseFormRegister, UseFormSetValue } from "react-hook-form";
import { inputFieldType } from "../_types/inputFieldType";
import { CheckOutFormValues } from "./CheckoutFormTemplate";
import FormSection from "./FormSection";
import { fieldsObject } from "../_utils/fieldsObject";

interface FormSectionsProps {}

const sections: string[] = ["Customer Information", "Shipping Information"];

function FormSections({}: FormSectionsProps) {
  const customerSection = fieldsObject.slice(0, 3);
  const shippingSection = fieldsObject.slice(3);
  return (
    <div className="flex flex-col gap-3 sm:gap-4">
      <FormSection fields={customerSection} title={sections[0]} />
      <FormSection fields={shippingSection} title={sections[1]} />
    </div>
  );
}

export default FormSections;
