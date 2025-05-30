"use client";

import { Button } from "@/app/_components/shadcn/button";
import { useCart } from "@/app/_context/CartProvider";
import { FormProvider } from "@/app/_context/FormContext";
import { instance } from "@/app/_lib/axiosInstance";
import { cartInitialState } from "@/app/_lib/store/slices/cartSlice/cartSlice";
import { useAppSelector } from "@/app/_lib/store/store";
import { CartProduct, ICart } from "@/app/cart/_types/CartType";
import { useToast } from "@/hooks/use-toast";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { match } from "ts-pattern";
import * as yup from "yup";
import { defaultValuesType } from "../_types/defaultValuesType";
import { checkOutFormValidations } from "../_utils/formValidation";
import FormSections from "./FormSections";
import OrderConfirmation from "./OrderConfirmation";
import OrderSummary from "./OrderSummary";

interface CheckOutFormTemplateProps {
  defaultValues: defaultValuesType;
  product?: any;
}

export type CheckOutFormValues = yup.InferType<typeof checkOutFormValidations>;

const steps = ["Shipping Info", "Order Confirmation"];

function CheckOutFormTemplate({
  defaultValues,
  product,
}: CheckOutFormTemplateProps) {
  const { cart, setCart } = useCart();
  const user = useAppSelector((state) => state.user);
  const [activeStep, setActiveStep] = useState<number>(0);
  const { 0: isLoading, 1: setIsLoading } = useState<boolean>(false);
  const route = useRouter();
  const { toast } = useToast();

  let finalProductsArr: CartProduct[] = match(product)
    .with(undefined, () => cart?.products || [])
    .otherwise(() => [
      {
        productID: product.productId,
        title: product.title,
        unitPaymentPrice: product.price,
        discount: product.discount,
        quantity: 1,
        color: product.color,
        category: product.category,
        brand: product.brand,
        image: product.image,
      },
    ]);

  let finalSubTotalValue: number = match(product)
    .with(undefined, () => cart?.subTotal || 0)
    .otherwise(() => product.price - product.discount);

  let finalDefaultValues: defaultValuesType = {
    ...defaultValues,
    userID: user.id || "",
    products: finalProductsArr,
    subTotal: finalSubTotalValue,
    finalPaidAmount: finalSubTotalValue,
    userInfo: {
      ...defaultValues.userInfo,
      phoneNumber1: user?.phoneNumber || "",
      city: user?.address?.city || "",
      country: user?.address?.country || "",
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      address: user?.address?.address_line1 || "",
    },
  };

  const methods = useForm<CheckOutFormValues>({
    resolver: yupResolver(checkOutFormValidations),
    mode: "onChange",
    reValidateMode: "onChange",
    criteriaMode: "firstError",
    defaultValues: finalDefaultValues,
  });
  const {
    // handleSubmit,
    watch,
    formState: { isValid },
    // getValues,
  } = methods;

  const handleNext = () => {
    if (activeStep !== steps.length) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    if (activeStep === steps.length) {
      setActiveStep(0);
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
  };

  async function handleSubmitForm(data: CheckOutFormValues) {
    console.log("Submitted data : ", data);
    try {
      setIsLoading(true);

      const response = await instance.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/order`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (watch("isFromCart")) {
        let newCart: ICart = {
          ...cartInitialState,
          _id: cart._id,
          userID: user.id,
        };
        setCart(newCart);
      }

      if (watch("paymentMethod") === "cash") {
        setIsLoading(false);
        toast({
          description: response.data.message,
          variant: "success",
        });

        route.push("/orders");
      } else if (watch("paymentMethod") === "card") {
        const paymentResponse = await instance.post(
          `
          ${process.env.NEXT_PUBLIC_API_URL}/api/checkout_sessions`,
          response.data.order,
          {
            headers: {
              "Content-Type": "application/json",
            },
          },
        );
        setIsLoading(false);

        window.location.href = paymentResponse.data.url;
      }
    } catch (error: any) {
      const errorMsg =
        error.response.data?.message &&
        error.response.data?.message === "Validation failed"
          ? error.response.data.errors["code"]._errors[0]
          : error.response.data.error;
      toast({
        description: errorMsg,
        variant: "destructive",
      });
      setIsLoading(false);
    }
  }

  if (defaultValues.isFromCart && !cart.products.length) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <h1>
          Cart is empty. Please return back to{" "}
          <Link href={"/products"} className="italic text-sky-600 underline">
            products page
          </Link>
        </h1>
      </div>
    );
  }

  return (
    <div
      className={`h-full w-full px-3 py-14 sm:px-10 sm:py-20 ${isLoading ? "pointer-events-none opacity-40" : ""}`}
    >
      <div className="w-full">
        <div className="flex items-center justify-between gap-4 py-4">
          {steps.map((label, index) => {
            const isActive = index === activeStep;
            const isCompleted = index < activeStep;

            return (
              <div key={label} className="flex flex-1 items-center gap-2">
                <div className="flex flex-row items-center gap-2">
                  <div
                    className={`flex h-8 w-8 flex-grow items-center justify-center rounded-full border-2 p-3 text-sm font-medium transition ${isCompleted ? "border-green-500 bg-green-500 text-white" : ""} ${isActive ? "border-primary bg-primary text-white" : ""} ${!isActive && !isCompleted ? "border-gray-300 text-gray-500" : ""} `}
                  >
                    {index + 1}
                  </div>
                  <div className="flex flex-col text-center text-sm font-medium">
                    {label}
                  </div>
                </div>

                {index < steps.length - 1 && (
                  <div className="mx-auto mt-2 h-0.5 w-full max-w-[60%] bg-gray-300" />
                )}
              </div>
            );
          })}
        </div>

        <>
          <form onSubmit={methods.handleSubmit(handleSubmitForm)}>
            {/* //// Main screens here : */}
            <FormProvider value={methods}>
              <section className="grid w-full grid-cols-1 gap-y-4 px-4 py-10 sm:gap-x-9 sm:px-4 md:grid-cols-[2fr_1fr] md:gap-x-40 md:px-8">
                {activeStep === 0 && <FormSections />}
                {activeStep !== 0 && <OrderConfirmation />}
                <OrderSummary />
              </section>
            </FormProvider>

            {/* //// Control buttons : */}
            <div className="flex w-full items-center justify-between">
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                variant={"outline"}
              >
                Back
              </Button>

              <Button
                onClick={handleNext}
                type={activeStep === steps.length ? "submit" : "button"}
                disabled={!isValid}
                variant={
                  activeStep === steps.length - 1 || activeStep === steps.length
                    ? "default"
                    : "outline"
                }
              >
                {match(activeStep)
                  .with(0, () => "Next")
                  .otherwise(() =>
                    match(watch("paymentMethod"))
                      .with("cash", () => "Place Order")
                      .otherwise(() => "Pay Now"),
                  )}
              </Button>
            </div>
          </form>
        </>
      </div>
    </div>
  );
}

export default CheckOutFormTemplate;
