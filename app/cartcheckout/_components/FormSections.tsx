import { fieldsObject } from "../_utils/fieldsObject";
import FormSection from "./FormSection";

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
