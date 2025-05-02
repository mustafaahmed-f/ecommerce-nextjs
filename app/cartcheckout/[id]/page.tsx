import { getSingleProduct } from "@/app/_lib/APIs/productsAPIs";
import CheckOutFormTemplate from "../_components/CheckoutFormTemplate";
import { defaultValues } from "./_utils/defaultValues";

interface PageProps {
  params: {
    id: string;
  };
}

async function Page({ params }: PageProps) {
  const product = await getSingleProduct(parseInt(params.id));

  if (!product.product)
    return (
      <div className="flex h-full w-full items-center justify-center text-center">
        <h1>Product not found</h1>;
      </div>
    );
  return (
    <CheckOutFormTemplate
      defaultValues={defaultValues}
      product={product.product}
    />
  );
}

export default Page;
