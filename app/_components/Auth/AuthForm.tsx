"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import AuthInputfield from "./AuthInputField";
import AuthButton from "./AuthButton";
import Link from "next/link";
import {
  logInSystemAction,
  signUpSystemAction,
} from "@/app/_actions/authActions";
import { useState } from "react";
import { useAppDispatch } from "@/app/_lib/store/store";
import Spinner from "../Spinner";
import SnackBar from "../SnackBar";
import { signIn } from "@/app/_lib/store/slices/userSlice/userSlice";
import { redirect } from "next/navigation";

// Type guard to check if `response` has `data` property
function hasUserInResponse(
  response: any
): response is { success: boolean; message: string; user: any } {
  return "user" in response;
}

interface AuthFormProps {
  mySchema: Yup.ObjectSchema<any>;
  purpose: string;
  extraField: string;
  extraLink: string;
  defaultValues?: { email: string; password: string };
  fields: { field: string; label: string }[];
}

function AuthForm({
  mySchema,
  purpose,
  extraField,
  extraLink,
  fields,
  defaultValues,
}: AuthFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ [key: string]: any }>({
    resolver: yupResolver(mySchema),
    mode: "onChange",
    reValidateMode: "onChange",
    criteriaMode: "firstError",
  });

  const dispatch = useAppDispatch();
  const { 0: alertMessage, 1: setAlertMessage } = useState<string | null>(null);
  const { 0: isError, 1: setIsError } = useState<boolean>(false);
  const { 0: isLoading, 1: setIsLoading } = useState<boolean>(false);

  const action = purpose === "Sign in" ? logInSystemAction : signUpSystemAction;

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
        }
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
    <>
      {!isLoading && alertMessage && (
        <SnackBar
          message={alertMessage}
          severity={isError ? "error" : "success"}
        />
      )}
      <form onSubmit={handleSubmit(handleSubmitFn)}>
        {fields.map((element, index) => (
          <AuthInputfield
            errors={errors}
            field={element["field"]}
            register={register}
            label={element["label"]}
            key={index}
            defaultValue={
              purpose === "Sign in" && defaultValues
                ? defaultValues[element["field"] as keyof typeof defaultValues]
                : null
            }
          />
        ))}

        {extraField && (
          <div className="flex justify-end w-full my-4">
            <p className="cursor-pointer hover:text-blue-500 ">
              <Link href={extraLink}>{extraField}</Link>
            </p>
          </div>
        )}
        <div className="w-full mt-4">
          <AuthButton
            disabledHandler={Object.keys(errors).length > 0 || isLoading}
          >
            {isLoading ? (
              <p>
                <span className="me-1">
                  <Spinner />
                </span>
                Loading...
              </p>
            ) : (
              <p>{purpose}</p>
            )}
          </AuthButton>
        </div>
      </form>
    </>
  );
}

export default AuthForm;
