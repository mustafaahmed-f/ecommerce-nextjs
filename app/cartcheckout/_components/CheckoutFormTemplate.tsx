"use client";

import { useCart } from "@/app/_context/CartProvider";
import { FormProvider } from "@/app/_context/FormContext";
import { useAppSelector } from "@/app/_lib/store/store";
import { CartProduct } from "@/app/cart/_types/CartType";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Step, StepLabel, Stepper } from "@mui/material";
import Link from "next/link";
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
  const { cart } = useCart();
  const user = useAppSelector((state) => state.user);
  const [activeStep, setActiveStep] = useState<number>(0);

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
    getValues,
  } = methods;

  const handleNext = () => {
    //TODO : at last step we will decide which method to use ( order now or payment )
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
    if (watch("paymentMethod") === "cash") {
      //todo: Call order backend API to create the order manually
      console.log("Cash payment confirmed. Order data:", data);
      return;
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
    <div className="h-full w-full px-3 py-14 sm:px-10 sm:py-20">
      <Box sx={{ width: "100%" }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label) => {
            const stepProps: { completed?: boolean } = {};
            const labelProps: {
              optional?: React.ReactNode;
            } = {};
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {/* //TODO : write here logic after finishing the form: */}

        <>
          <form onSubmit={methods.handleSubmit(handleSubmitForm)}>
            {/* //// Main screens here : */}
            <FormProvider value={methods}>
              <section className="grid w-full grid-cols-1 gap-y-4 px-4 py-10 sm:grid-cols-2 sm:gap-x-9 sm:px-4 md:grid-cols-[2fr_1fr] md:gap-x-40 md:px-8">
                {activeStep === 0 && <FormSections />}
                {activeStep !== 0 && <OrderConfirmation />}
                <OrderSummary cart={cart} />
              </section>
            </FormProvider>

            <p>asdf</p>

            {/* //// Control buttons : */}
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button
                onClick={handleNext}
                type={activeStep === steps.length ? "submit" : "button"}
                disabled={!isValid}
              >
                {match(activeStep)
                  .with(0, () => "Next")
                  .otherwise(() => "Confirm Order")}
              </Button>
            </Box>
          </form>
        </>
      </Box>
    </div>
  );
}

export default CheckOutFormTemplate;
