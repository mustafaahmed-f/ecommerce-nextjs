import { inputFieldType } from "../_types/inputFieldType";
import FormRenderer from "./FormRenderer";

interface FormSectionProps {
  fields: inputFieldType[];
  title: string;
}

function FormSection({ fields, title }: FormSectionProps) {
  return (
    <>
      <h3 className="mb-3 text-xl font-semibold">{title}</h3>
      <FormRenderer fields={fields} />
    </>
  );
}

export default FormSection;
