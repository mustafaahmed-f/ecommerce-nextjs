import CheckOutFormTemplate from "./_components/CheckoutFormTemplate";
import { defaultValues } from "./_utils/defaultValues";

interface PageProps {}

function Page({}: PageProps) {
  return <CheckOutFormTemplate defaultValues={defaultValues} />;
}

export default Page;
