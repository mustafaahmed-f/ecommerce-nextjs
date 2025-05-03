import { useFormContext } from "@/app/_context/FormContext";
import ShoppingItem from "./ShoppingItem";
import PaymentMethodSelector from "./PaymentMethodSelector";

interface OrderConfirmationProps {}

function OrderConfirmation({}: OrderConfirmationProps) {
  const { watch } = useFormContext();
  const products = watch("products");
  return (
    <>
      <h3 className="mb-4 text-xl font-semibold sm:mb-4">Confirmation</h3>
      <div className="w-full bg-[#F5F5F5] p-6">
        {/* //// Shopping items section */}
        <h5 className="mb-3 font-bold underline">Shopping items</h5>
        <div className="flex flex-col gap-4">
          {products.map((product: any) => {
            return <ShoppingItem {...product} key={product.productID} />;
          })}
        </div>
        <hr className="my-4 border border-slate-800" />
        {/* //// Shipping info section */}
        <h5 className="mb-3 font-bold underline">Shipping info</h5>
        <div className="flex flex-col gap-2">
          <p>
            <span className="font-semibold">Email:</span>{" "}
            {watch("userInfo.email")}
          </p>
          <p>
            <span className="font-semibold">Country:</span>{" "}
            {watch("userInfo.country")}
          </p>
          <p>
            <span className="font-semibold">City:</span>{" "}
            {watch("userInfo.city")}
          </p>
          <p>
            <span className="font-semibold">Address:</span>{" "}
            {watch("userInfo.address")}
          </p>
          <p>
            <span className="font-semibold">Name:</span>{" "}
            {watch("userInfo.firstName")} {watch("userInfo.lastName")}
          </p>
          <p>
            <span className="font-semibold">Phone 1:</span>{" "}
            {watch("userInfo.phoneNumber1")}
          </p>
          {watch("userInfo.phoneNumber2") && (
            <p>
              <span className="font-semibold">Phone 2:</span>{" "}
              {watch("userInfo.phoneNumber2")}
            </p>
          )}
        </div>
        <hr className="my-4 border border-slate-800" />
        {/* //// Payment method section */}
        <h5 className="mb-3 font-bold underline">Payment method</h5>
        <PaymentMethodSelector />
      </div>
    </>
  );
}

export default OrderConfirmation;
