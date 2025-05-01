import { inputFieldType } from "../_types/inputFieldType";
import DropListField from "./DropListField";
import EmailInputField from "./EmailInputField";
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
          case "email":
            return <EmailInputField {...field} />;

          case "dropdown":
            return <DropListField {...field} />;

          case "phone":
            return <PhoneInputField {...field} />;

          case "text":
            return <TextInputField {...field} />;

          default:
            return <p>Type not found</p>;
        }
      })}
    </div>
  );
}

export default FormRenderer;
