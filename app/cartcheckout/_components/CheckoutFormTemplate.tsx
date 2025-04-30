"use client";

import { useCart } from "@/app/_context/CartProvider";
import { defaultValuesType } from "../_types/defaultValuesType";
import { inputFieldType } from "../_types/inputFieldType";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { checkOutFormValidations } from "../_utils/formValidation";
import * as yup from "yup";
import { useState } from "react";
import {
  Box,
  Button,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import { match } from "ts-pattern";
import OrderSummary from "./OrderSummary";
import FormRenderer from "./FormRenderer";
import OrderConfirmation from "./OrderConfirmation";

interface CheckOutFormTemplateProps {
  defaultValues: defaultValuesType;
  formFields: inputFieldType[];
}

export type CheckOutFormValues = yup.InferType<typeof checkOutFormValidations>;

const steps = ["Shipping Info", "Order Confirmation"];

function CheckOutFormTemplate({
  defaultValues,
  formFields,
}: CheckOutFormTemplateProps) {
  const { cart } = useCart();
  const [activeStep, setActiveStep] = useState<number>(0);

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    watch,
    formState: { errors, isValid },
  } = useForm<CheckOutFormValues>({
    resolver: yupResolver(checkOutFormValidations),
    mode: "onChange",
    reValidateMode: "onChange",
    criteriaMode: "firstError",
    defaultValues,
  });

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
            <section className="grid w-full grid-cols-1 gap-4 px-4 py-10 sm:grid-cols-2 sm:px-8 md:grid-cols-[2fr_1fr]">
              <form onSubmit={handleSubmit(handleSubmitForm)}>
                {activeStep === 0 && (
                  <FormRenderer
                    fields={formFields}
                    setValue={setValue}
                    register={register}
                    errors={errors}
                  />
                )}
                {activeStep === 1 && <OrderConfirmation />}
              </form>
              <OrderSummary setValue={setValue} watch={watch} cart={cart} />
            </section>

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
              <Button onClick={handleNext}>
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
