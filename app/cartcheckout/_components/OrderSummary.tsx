import { useFormContext } from "@/app/_context/FormContext";
import { instance } from "@/app/_lib/axiosInstance";
import { couponType } from "@/app/_lib/couponTypes";
import { GetType } from "@/app/_lib/GetType";
import { useCallback, useEffect, useState } from "react";
import { useWatch } from "react-hook-form";
import { match } from "ts-pattern";
import { getAdditionalCharges } from "../_utils/getAdditionalCharges";

type couponTypes = GetType<typeof couponType>;
type initialCouponDiscountType = {
  discountAmount: number;
  discountType: couponTypes | "";
};
const intialCouponDiscount: initialCouponDiscountType = {
  discountAmount: 0,
  discountType: "",
};

function OrderSummary() {
  const { watch, setValue, trigger, control } = useFormContext();
  const { 0: couponDiscount, 1: setCouponDiscount } =
    useState<initialCouponDiscountType>(intialCouponDiscount);
  const { 0: couponCode, 1: setCouponCode } = useState<string>("");
  const { 0: isLoading, 1: setIsLoading } = useState<boolean>(false);
  const { 0: isValidCoupon, 1: setIsValidCoupon } = useState<boolean>(false);
  const { 0: errorCoupon, 1: setErrorCoupon } = useState<string>("");
  const finalPaidAmount = useWatch({ control, name: "finalPaidAmount" });
  const paymentMethod = useWatch({ control, name: "paymentMethod" });
  const subTotal = watch("subTotal");
  const shippingCost = 3.99;
  const CashOnDelivery: number = paymentMethod === "cash" ? 2.99 : 0;

  const products = watch("products");

  const totalCartDiscount = products.reduce(
    (acc, el) => el.discount! * el.quantity + acc,
    0,
  );

  const amountToDiscount: () => number = useCallback(() => {
    if (
      couponDiscount.discountType === "" &&
      couponDiscount.discountAmount === 0
    )
      return 0;
    return match(couponDiscount.discountType)
      .with("amount", () => couponDiscount.discountAmount)
      .otherwise(() => subTotal * (couponDiscount.discountAmount / 100));
  }, [couponDiscount, subTotal]);

  useEffect(() => {
    setValue(
      "finalPaidAmount",
      subTotal -
        amountToDiscount() +
        getAdditionalCharges(shippingCost, CashOnDelivery),
    );
    trigger("finalPaidAmount");
  }, [
    couponDiscount,
    setValue,
    subTotal,
    amountToDiscount,
    CashOnDelivery,
    trigger,
  ]);

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
      setValue("couponId", response.data.couponId);
      trigger("couponId");
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
    setValue("couponId", null);
    trigger("couponId");
  }

  return (
    <div className="h-fit bg-[#E9E9E9] px-10 py-5 max-md:mt-10 max-sm:-mx-7 sm:w-full">
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
          placeholder="Coupon Code"
          disabled={isLoading || isValidCoupon}
        />
        <button
          type="button"
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
      <div className="mt-5 grid grid-cols-[2fr_1fr] gap-1">
        <p>Price After Discount</p>
        <p className="text-right">$ {subTotal}</p>
        <p>Total Discount</p>
        <p className="text-right">
          $ {(totalCartDiscount + amountToDiscount()).toFixed(2)}
        </p>
        <p>Shipping</p>
        <p className="text-right">$ {shippingCost}</p>
        <p>Tax</p>
        <p className="text-right">$ 0.00</p>
        <p>Cash On Delivery</p>
        <p className="text-right">$ {CashOnDelivery.toFixed(2)}</p>
        <p>Coupon Discount</p>
        <p className="text-right">$ {amountToDiscount().toFixed(2)}</p>
        <hr className="col-span-2 my-1 border-t-[1px] border-slate-950 sm:my-2" />
        <p className="font-semibold">Total Paid Amount</p>
        <p className="text-right font-semibold">
          $ {finalPaidAmount.toFixed(2)}
        </p>
      </div>
    </div>
  );
}

export default OrderSummary;
