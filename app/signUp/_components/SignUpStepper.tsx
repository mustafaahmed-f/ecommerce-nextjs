"use client";
import { signUpSystemAction } from "@/app/_actions/authActions";
import { getFullAddress } from "@/app/_lib/getAddress";
import { signupValidations } from "@/app/_lib/validationSchemas/signUpValidations";
import FormRenderer from "@/app/cartcheckout/_components/FormRenderer";
import { yupResolver } from "@hookform/resolvers/yup";
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
import { Button } from "@/app/_components/shadcn/button";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/app/_components/shadcn/alert";
import { AlertCircle } from "lucide-react";
import { ErrorToast } from "@/app/_lib/toasts";

const steps = ["Basic info", "Add address", "Upload profile image"];

const stepFields: Record<number, string[]> = {
  0: signupStep1Fields.map((f) => f.name),
  1: signupStep2Fields.map((f) => f.name),
};

const mySchema: Yup.ObjectSchema<any> = signupValidations;
export type SignUpFormValues = Yup.InferType<typeof mySchema>;

export default function SignUpStepper() {
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

      const response = await signUpSystemAction(data);
      console.log(response);
      if (response.success) {
        console.log("Here");

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      } else {
        ErrorToast.fire({
          title: response.message,
        });
        setIsLoading(false);
      }
    } catch (error: any) {
      setIsLoading(false);
      ErrorToast.fire({
        title: error.message,
      });
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
    <div className="w-full">
      <div className="flex items-center justify-between gap-4 py-4">
        {steps.map((label, index) => {
          const isActive = index === activeStep;
          const isCompleted = index < activeStep && !isStepSkipped(index);
          const isOptional = isStepOptional(index);

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
                  {isOptional && (
                    <span className="ml-1 text-xs text-muted-foreground">
                      (Optional)
                    </span>
                  )}
                </div>
              </div>

              {index < steps.length - 1 && (
                <div className="mx-auto mt-2 h-0.5 w-full max-w-[60%] bg-gray-300" />
              )}
            </div>
          );
        })}
      </div>

      {activeStep === steps.length ? (
        <React.Fragment>
          <Alert variant="success" color="" className="mt-3">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>Signed up successfully !!</AlertDescription>
          </Alert>

          <div className="mt-5 flex w-full justify-end">
            <Button variant={"link"}>
              <Link href={"/login"} onClick={handleReset}>
                Go to login page
              </Link>
            </Button>
          </div>
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
                    variant="default"
                    onClick={handleGetAddress}
                    size={"default"}
                    className="min-h-10"
                  >
                    Get Address
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
                  url={url}
                  setUrl={setUrl}
                />
              </div>
            )}

            <div className="mt-6 flex w-full items-center justify-between">
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                type="button"
                variant={"outline"}
              >
                Back
              </Button>

              <div className="flex">
                {isStepOptional(activeStep) && (
                  <Button
                    color="inherit"
                    onClick={handleSkip}
                    className="me-1"
                    type="button"
                  >
                    Skip
                  </Button>
                )}
                {activeStep < steps.length - 1 && (
                  <Button
                    color="inherit"
                    onClick={handleNext}
                    variant={"outline"}
                    type={"button"}
                  >
                    Next
                  </Button>
                )}
              </div>
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
            </div>
          </form>
          <div className="my-6 w-full text-center">
            <Button variant="link" color="inherit">
              <Link href={"/login"}>Already have account ?</Link>
            </Button>
          </div>
        </React.Fragment>
      )}
    </div>
  );
}
