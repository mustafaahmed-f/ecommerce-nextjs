import { inputFieldType } from "../_types/inputFieldType";
import FormRenderer from "./FormRenderer";

interface FormSectionProps {
  fields: inputFieldType[];
  title: string;
}

function FormSection({ fields, title }: FormSectionProps) {
  return (
    <div>
      <h3 className="mb-2 text-xl font-semibold sm:mb-4">{title}</h3>
      <FormRenderer fields={fields} />
    </div>
  );
}

export default FormSection;
