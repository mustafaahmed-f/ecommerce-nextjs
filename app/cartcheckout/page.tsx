import CheckOutFormTemplate from "./_components/CheckoutFormTemplate";
import { defaultValues } from "./_utils/defaultValues";
import { fieldsObject } from "./_utils/fieldsObject";

interface PageProps {}

function Page({}: PageProps) {
  return (
    <CheckOutFormTemplate
      defaultValues={defaultValues}
      formFields={fieldsObject}
    />
  );
}

export default Page;
