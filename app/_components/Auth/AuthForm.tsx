"use client";

import {
  logInSystemAction,
  signUpSystemAction,
} from "@/app/_actions/authActions";
import { signIn } from "@/app/_lib/store/slices/userSlice/userSlice";
import { useAppDispatch } from "@/app/_lib/store/store";
import { loginValidations } from "@/app/_lib/validationSchemas/logInValidations";
import { signupValidations } from "@/app/_lib/validationSchemas/signUpValidations";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import GoogleLogInBtn from "../GoogleLogInBtn";
import SnackBar from "../SnackBar";
import AuthButton from "./AuthButton";
import AuthInputfield from "./AuthInputField";
import { useAlert } from "@/app/_context/AlertProvider";
import { Button } from "@mui/material";

// Type guard to check if `response` has `data` property
function hasUserInResponse(
  response: any
): response is { success: boolean; message: string; user: any } {
  return "user" in response;
}

interface AuthFormProps {
  purpose: string;
  extraField: string;
  extraLink: string;
  defaultValues?: { email: string; password: string };
  fields: { field: string; label: string }[];
}

function AuthForm({
  purpose,
  extraField,
  extraLink,
  fields,
  defaultValues,
}: AuthFormProps) {
  const mySchema: Yup.ObjectSchema<any> =
    purpose === "Sign in" ? loginValidations : signupValidations;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm<{ [key: string]: any }>({
    resolver: yupResolver(mySchema),
    mode: "onChange",
    reValidateMode: "onChange",
    criteriaMode: "firstError",
  });

  const dispatch = useAppDispatch();
  const { setAlertMessage, setIsError } = useAlert();
  const { 0: file, 1: setFile } = useState<null | any>("");
  // const { 0: alertMessage, 1: setAlertMessage } = useState<string | null>(null);
  // const { 0: isError, 1: setIsError } = useState<boolean>(false);
  const { 0: isLoading, 1: setIsLoading } = useState<boolean>(false);

  const action = purpose === "Sign in" ? logInSystemAction : signUpSystemAction;

  const handleFileChange = (event: any) => {
    setFile(event.target.files[0]);
    setValue("image", event.target.files[0]);
  };

  async function handleSubmitFn(data: any) {
    try {
      setIsLoading(true);
      setAlertMessage("");
      setIsError(false);
      const response = await action(data);
      if (response.success) {
        setAlertMessage(response.message); // Set success message
        setIsError(false);
        if (purpose === "Sign in" && hasUserInResponse(response)) {
          dispatch(signIn(response.user));
          setIsLoading(false);
          redirect("/");
        } else {
          setIsLoading(false);
          redirect("/login");
        }
      } else {
        setAlertMessage(response.message); // Set error message
        setValue("profileImage", "");
        setFile(null);
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
    <>
      {/* {!isLoading && alertMessage && (
        <SnackBar
          message={alertMessage}
          severity={isError ? "error" : "success"}
        />
      )} */}
      <form onSubmit={handleSubmit(handleSubmitFn)}>
        {fields.map((element, index) => (
          <AuthInputfield
            errors={errors}
            field={element["field"]}
            register={register}
            label={element["label"]}
            key={index}
            defaultValues={
              purpose === "Sign in" && defaultValues
                ? defaultValues[element["field"] as keyof typeof defaultValues]
                : undefined
            }
          />
        ))}

        {purpose === "Sign up" && (
          <div className="my-3">
            <input type="file" value={file} onChange={handleFileChange} />
          </div>
        )}

        {extraField && (
          <div className="flex justify-end w-full my-4">
            <Button variant="text" color="inherit">
              <Link href={extraLink}>{extraField}</Link>
            </Button>
          </div>
        )}
        <div className="w-full mt-4">
          <AuthButton disabledHandler={isLoading || !isValid}>
            {isLoading ? "Loading ..." : purpose}
          </AuthButton>
        </div>
      </form>
      {purpose === "Sign in" && (
        <div className="my-3">
          <GoogleLogInBtn />
        </div>
      )}
    </>
  );
}

export default AuthForm;
