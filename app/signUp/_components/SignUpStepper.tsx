"use client";
import { signUpSystemAction } from "@/app/_actions/authActions";
import SnackBar from "@/app/_components/SnackBar";
import { signupValidations } from "@/app/_lib/validationSchemas/signUpValidations";
import FormRenderer from "@/app/cartcheckout/_components/FormRenderer";
import { yupResolver } from "@hookform/resolvers/yup";
import { Alert } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import * as React from "react";
import { useForm } from "react-hook-form";
import { match } from "ts-pattern";
import * as Yup from "yup";
import { signupDefaultValues } from "../_utils/signUpDefaultValues";
import {
  signupStep1Fields,
  signupStep2Fields,
} from "../_utils/signUpFieldsObjects";
import ImageUploader from "./ImageUploader";
import { getFullAddress } from "@/app/_lib/getAddress";

const steps = ["Basic info", "Add address", "Upload profile image"];

const stepFields: Record<number, string[]> = {
  0: signupStep1Fields.map((f) => f.name),
  1: signupStep2Fields.map((f) => f.name),
};

const mySchema: Yup.ObjectSchema<any> = signupValidations;
export type SignUpFormValues = Yup.InferType<typeof mySchema>;

export default function SignUpStepper() {
  const { 0: file, 1: setFile } = React.useState<null | File>(null);
  const { 0: alertMessage, 1: setAlertMessage } = React.useState<string | null>(
    null,
  );
  const { 0: isError, 1: setIsError } = React.useState<boolean>(false);
  const { 0: isLoading, 1: setIsLoading } = React.useState<boolean>(false);
  const { 0: activeStep, 1: setActiveStep } = React.useState(0);
  const { 0: skipped, 1: setSkipped } = React.useState(new Set<number>());
  const { 0: onUploadComplete, 1: setOnUploadComplete } = React.useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    trigger,
    formState: { errors, isValid },
  } = useForm<SignUpFormValues>({
    resolver: yupResolver(mySchema),
    mode: "onChange",
    reValidateMode: "onChange",
    criteriaMode: "firstError",
    defaultValues: signupDefaultValues,
  });

  const [url, setUrl] = React.useState(watch("profileImage"));

  const isStepOptional = (step: number) => {
    return step === 1;
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = async () => {
    const isValid = await trigger(
      (stepFields as { [key: number]: any })[activeStep],
    );
    if (!isValid) return;
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  async function handleSubmitFn(data: any) {
    if (activeStep < steps.length - 1) return;
    try {
      setIsLoading(true);
      setAlertMessage("");
      setIsError(false);
      const response = await signUpSystemAction(data);
      console.log(response);
      if (response.success) {
        console.log("Here");
        setAlertMessage(response.message); // Set success message
        setIsError(false);
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      } else {
        setAlertMessage(response.message); // Set error message
        setIsError(true);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      setAlertMessage("An unexpected error occurred. Please try again.");
      setIsError(true);
      setFile(null);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleGetAddress() {
    const { city, countryName, latitude, longitude, address } =
      await getFullAddress();

    if (setValue) {
      setValue("address.address_line1", address);
      setValue("address.city", city);
      setValue("address.country", countryName);
      setValue("address.geolocation.lat", latitude);
      setValue("address.geolocation.long", longitude);
    }
  }

  return (
    <Box sx={{ width: "100%" }}>
      {!isLoading && alertMessage && isError && (
        <SnackBar message={alertMessage} severity="error" />
      )}
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Alert
            severity="success"
            sx={{ width: "100%" }}
            variant="filled"
            className="my-6"
          >
            Signed up successfully !!
          </Alert>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Link href={"/login"} onClick={handleReset}>
              Go to login page
            </Link>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <form onSubmit={handleSubmit(handleSubmitFn)} className="my-5">
            {activeStep === 0 && (
              <FormRenderer<SignUpFormValues>
                fields={signupStep1Fields}
                watch={watch}
                setValue={setValue}
                trigger={trigger}
                register={register}
                errors={errors}
                control={control}
              />
            )}
            {activeStep === 1 && (
              <>
                <div className="mb-5 mt-2 w-full text-center">
                  <Button
                    color="inherit"
                    variant="outlined"
                    onClick={handleGetAddress}
                    className="mt-5"
                  >
                    Get your address
                  </Button>
                </div>
                <FormRenderer<SignUpFormValues>
                  fields={signupStep2Fields}
                  watch={watch}
                  setValue={setValue}
                  trigger={trigger}
                  register={register}
                  errors={errors}
                  control={control}
                />
              </>
            )}
            {activeStep === 2 && (
              <div className="my-3">
                <ImageUploader
                  watch={watch}
                  trigger={trigger}
                  setValue={setValue}
                  onUploadComplete={setOnUploadComplete}
                  file={file}
                  setFile={setFile}
                  url={url}
                  setUrl={setUrl}
                />
              </div>
            )}

            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
                type="button"
              >
                Back
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              {isStepOptional(activeStep) && (
                <Button
                  color="inherit"
                  onClick={handleSkip}
                  sx={{ mr: 1 }}
                  type="button"
                >
                  Skip
                </Button>
              )}
              {activeStep < steps.length - 1 && (
                <Button color="inherit" onClick={handleNext} type={"button"}>
                  Next
                </Button>
              )}
              {activeStep === steps.length - 1 && (
                <Button
                  color="inherit"
                  disabled={(isLoading || !isValid) && !onUploadComplete}
                  type={"submit"}
                >
                  {match(isLoading)
                    .with(true, () => "loading...")
                    .with(false, () => "Finish")
                    .otherwise(() => "")}
                </Button>
              )}
            </Box>
          </form>
          <div className="my-6 w-full text-center">
            <Button variant="contained" color="inherit">
              <Link href={"/login"}>Already have account ?</Link>
            </Button>
          </div>
        </React.Fragment>
      )}
    </Box>
  );
}
