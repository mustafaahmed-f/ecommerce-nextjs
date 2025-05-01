import { inputFieldType } from "../_types/inputFieldType";
import DropListField from "./DropListField";
import PhoneInputField from "./PhoneInputField";
import TextInputField from "./TextInputField";

interface FormRendererProps {
  fields: inputFieldType[];
}

function FormRenderer({ fields }: FormRendererProps) {
  return (
    <div className="grid w-full grid-cols-2 gap-2">
      {fields.map((field: inputFieldType) => {
        switch (field.type) {
          case "dropdown":
            return <DropListField {...field} key={field.name} />;

          case "phone":
            return <PhoneInputField {...field} key={field.name} />;

          default:
            return <TextInputField {...field} key={field.name} />;
        }
      })}
    </div>
  );
}

export default FormRenderer;
