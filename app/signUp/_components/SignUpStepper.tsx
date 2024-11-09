"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { signupValidations } from "@/app/_lib/validationSchemas/signUpValidations";
import * as Yup from "yup";
import Link from "next/link";
import { Alert } from "@mui/material";
import { signUpSystemAction } from "@/app/_actions/authActions";
import StepFields from "./StepFields";
import SnackBar from "@/app/_components/SnackBar";
import { match } from "ts-pattern";
import ImageUploader from "./ImageUploader";

const steps = ["Basic info", "Add address", "Upload profile image"];
const firstStep = [
  { field: "userName", label: "Username" },
  { field: "firstName", label: "First Name" },
  { field: "lastName", label: "Last Name" },
  { field: "email", label: "Email" },
  { field: "password", label: "Password" },
  { field: "rePassword", label: "Re-Password" },
  { field: "phoneNumber", label: "Phone Number" },
];
const secondStep = [
  { field: "address.unit_number", label: "Unit Number" },
  { field: "address.street_number", label: "Street Number" },
  { field: "address.address_line1", label: "Address Line 1" },
  { field: "address.address_line2", label: "Address Line 2" },
  { field: "address.city", label: "City" },
  { field: "address.country", label: "Country" },
  { field: "address.geolocation.lat", label: "Latitude" },
  { field: "address.geolocation.long", label: "Longitude" },
];

const stepFields = {
  0: firstStep.map((field) => field.field),
  1: secondStep.map((field) => field.field),
};

export default function SignUpStepper() {
  const { 0: file, 1: setFile } = React.useState<null | File>(null);
  const { 0: alertMessage, 1: setAlertMessage } = React.useState<string | null>(
    null
  );
  const { 0: isError, 1: setIsError } = React.useState<boolean>(false);
  const { 0: isLoading, 1: setIsLoading } = React.useState<boolean>(false);
  const { 0: activeStep, 1: setActiveStep } = React.useState(0);
  const { 0: skipped, 1: setSkipped } = React.useState(new Set<number>());
  const { 0: onUploadComplete, 1: setOnUploadComplete } = React.useState(false);

  const mySchema: Yup.ObjectSchema<any> = signupValidations;

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors, isValid },
  } = useForm<{ [key: string]: any }>({
    resolver: yupResolver(mySchema),
    mode: "onChange",
    reValidateMode: "onChange",
    criteriaMode: "firstError",
  });

  const isStepOptional = (step: number) => {
    return step === 1;
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = async () => {
    const isValid = await trigger(
      (stepFields as { [key: number]: any })[activeStep]
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
      console.log(error);
    } finally {
      setIsLoading(false);
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
            Signed up and uploaded profile image successfully
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
          <form onSubmit={handleSubmit(handleSubmitFn)}>
            {activeStep === 0 && (
              <StepFields
                fields={firstStep}
                register={register}
                errors={errors}
                isRequired={true}
              />
            )}
            {activeStep === 1 && (
              <StepFields
                setAddress
                setValue={setValue}
                fields={secondStep}
                register={register}
                errors={errors}
              />
            )}
            {activeStep === 2 && (
              <div className="my-3">
                <ImageUploader
                  trigger={trigger}
                  setValue={setValue}
                  onUploadComplete={setOnUploadComplete}
                  file={file}
                  setFile={setFile}
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
          <div className="w-full my-6 text-center">
            <Button variant="contained" color="inherit">
              <Link href={"/login"}>Already have account ?</Link>
            </Button>
          </div>
        </React.Fragment>
      )}
    </Box>
  );
}
