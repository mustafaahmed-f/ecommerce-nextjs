"use client";

import { useCart } from "@/app/_context/CartProvider";
import { FormProvider } from "@/app/_context/FormContext";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
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
}

export type CheckOutFormValues = yup.InferType<typeof checkOutFormValidations>;

const steps = ["Shipping Info", "Order Confirmation"];

function CheckOutFormTemplate({ defaultValues }: CheckOutFormTemplateProps) {
  const { cart } = useCart();
  const [activeStep, setActiveStep] = useState<number>(0);

  let finalDefaultValues: defaultValuesType = {
    ...defaultValues,
    userID: cart?.userID || "",
    products: cart?.products || [],
    subTotal: cart?.subTotal || 0,
    finalPaidAmount: cart?.subTotal || 0,
  };

  const methods = useForm<CheckOutFormValues>({
    resolver: yupResolver(checkOutFormValidations),
    mode: "onChange",
    reValidateMode: "onChange",
    criteriaMode: "firstError",
    defaultValues: finalDefaultValues,
  });
  const {
    handleSubmit,
    watch,
    formState: { errors, isValid },
    getValues,
  } = methods;

  console.log("Value : ", getValues());
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  function handleSubmitForm(data: CheckOutFormValues) {}

  return (
    <div className="h-full min-h-screen w-full px-3 py-14 sm:px-10 sm:py-20">
      <Box sx={{ width: "100%" }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
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
        {activeStep === steps.length ? (
          <>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
            </Box>
          </>
        ) : (
          <>
            {/* //// Main screens here : */}
            <FormProvider value={methods}>
              <section className="grid w-full grid-cols-1 gap-y-4 px-4 py-10 sm:grid-cols-2 sm:gap-x-9 sm:px-4 md:grid-cols-[2fr_1fr] md:gap-x-40 md:px-8">
                <form onSubmit={handleSubmit(handleSubmitForm)}>
                  {activeStep === 0 && <FormSections />}
                  {activeStep === 1 && <OrderConfirmation />}
                </form>
                <OrderSummary cart={cart} />
              </section>
            </FormProvider>

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
              <Button onClick={handleNext} disabled={!isValid}>
                {match(activeStep)
                  .with(steps.length - 1, () =>
                    match(watch("paymentMethod"))
                      .with("cash", () => "Confirm Order")
                      .otherwise(() => "Proceed To Payment"),
                  )
                  .otherwise(() => "Next")}
              </Button>
            </Box>
          </>
        )}
      </Box>
    </div>
  );
}

export default CheckOutFormTemplate;
