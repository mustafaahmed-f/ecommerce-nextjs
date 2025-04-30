import { instance } from "@/app/_lib/axiosInstance";
import { couponType } from "@/app/_lib/couponTypes";
import { GetType } from "@/app/_lib/GetType";
import { ICart } from "@/app/cart/_types/CartType";
import { useCallback, useEffect, useState } from "react";
import { UseFormSetValue, UseFormWatch } from "react-hook-form";
import { match } from "ts-pattern";
import { CheckOutFormValues } from "./CheckoutFormTemplate";

interface OrderSummaryProps {
  watch: UseFormWatch<CheckOutFormValues>;
  setValue: UseFormSetValue<CheckOutFormValues>;
  cart: ICart;
}

type couponTypes = GetType<typeof couponType>;
type initialCouponDiscountType = {
  discountAmount: number;
  discountType: couponTypes | "";
};
const intialCouponDiscount: initialCouponDiscountType = {
  discountAmount: 0,
  discountType: "",
};

function OrderSummary({ watch, cart, setValue }: OrderSummaryProps) {
  const { 0: couponDiscount, 1: setCouponDiscount } =
    useState<initialCouponDiscountType>(intialCouponDiscount);
  const { 0: couponCode, 1: setCouponCode } = useState<string>("");
  const { 0: isLoading, 1: setIsLoading } = useState<boolean>(false);
  const { 0: isValidCoupon, 1: setIsValidCoupon } = useState<boolean>(false);
  const { 0: errorCoupon, 1: setErrorCoupon } = useState<string>("");

  const subTotal = watch("subTotal");
  const finalPaidAmount = watch("finalPaidAmount");

  const amountToDiscount: () => number = useCallback(() => {
    if (
      couponDiscount.discountType === "" &&
      couponDiscount.discountAmount === 0
    )
      return 0;
    return match(couponDiscount.discountType)
      .with("amount", () => couponDiscount.discountAmount)
      .otherwise(() => (finalPaidAmount * couponDiscount.discountAmount) / 100);
  }, [couponDiscount, finalPaidAmount]);

  useEffect(() => {
    setValue("finalPaidAmount", subTotal - amountToDiscount());
  }, [couponDiscount, setValue, subTotal, amountToDiscount]);

  async function applyCoupon() {
    try {
      setIsLoading(true);
      const response = await instance.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/coupons/check`,
        { code: couponCode },
      );
      setErrorCoupon("");
      setIsValidCoupon(true);
      setCouponDiscount(response.data.discountData);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      const errorMsg =
        error.response.data?.message &&
        error.response.data?.message === "Validation failed"
          ? error.response.data.errors["code"]._errors[0]
          : error.response.data.error;
      setErrorCoupon(errorMsg);
    }
  }

  function removeCoupon() {
    setCouponCode("");
    setIsValidCoupon(false);
    setCouponDiscount(intialCouponDiscount);
  }

  return (
    <div className="bg-[#E9E9E9] px-10 py-5 max-sm:-mx-7 sm:w-full">
      <h3 className="mb-4 text-lg font-semibold">Order Summary</h3>
      <div
        className={`grid grid-cols-[2fr_1fr] ${isLoading ? "pointer-events-none opacity-60" : ""} gap-1 rounded-md bg-white py-1 pe-1 ps-2 md:grid-cols-[3fr_1fr] ${errorCoupon.length ? "border-[1px] border-red-500" : "border-0"}`}
      >
        <input
          id="couponCodeInput"
          value={couponCode}
          onChange={(e) => {
            if (isValidCoupon) return;
            if (errorCoupon.length) setErrorCoupon("");
            setCouponCode(e.target.value);
          }}
          className="w-full bg-transparent px-2 outline-none"
          disabled={isLoading || isValidCoupon}
        />
        <button
          onClick={isValidCoupon ? removeCoupon : applyCoupon}
          className={`rounded-md bg-slate-950 px-4 py-2 text-white hover:bg-slate-800 ${isLoading ? "animate-pulse" : ""}`}
        >
          {match(isLoading)
            .with(true, () => "Checking")
            .otherwise(() =>
              match(isValidCoupon)
                .with(true, () => "Remove")
                .otherwise(() => "Apply"),
            )}
        </button>
      </div>
      {errorCoupon.length ? (
        <p className="mt-1 flex items-center gap-2 text-sm text-red-500">
          <span>⚠</span> {errorCoupon}
        </p>
      ) : null}
      {isValidCoupon ? (
        <p className="mt-1 flex items-center gap-2 text-sm text-green-500">
          <span>✅</span> {couponCode} applied
        </p>
      ) : null}
    </div>
  );
}

export default OrderSummary;
