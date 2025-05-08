import { loadStripe } from "@stripe/stripe-js";
import CheckOutFormTemplate from "./_components/CheckoutFormTemplate";
import { defaultValues } from "./_utils/defaultValues";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
);

function Page() {
  const options = {
    appearance: { theme: "flat" as const },
  };
  return <CheckOutFormTemplate defaultValues={defaultValues} />;
}

export default Page;
