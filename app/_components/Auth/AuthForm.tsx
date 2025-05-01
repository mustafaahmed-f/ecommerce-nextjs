"use client";

import { instance } from "@/app/_lib/axiosInstance";
import { signIn } from "@/app/_lib/store/slices/userSlice/userSlice";
import { useAppDispatch } from "@/app/_lib/store/store";
import { loginValidations } from "@/app/_lib/validationSchemas/logInValidations";
import { signupValidations } from "@/app/_lib/validationSchemas/signUpValidations";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@mui/material";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import GoogleLogInBtn from "../GoogleLogInBtn";
import SnackBar from "../SnackBar";
import AuthButton from "./AuthButton";
import AuthInputfield from "./AuthInputField";

// Type guard to check if `response` has `data` property
function hasUserInResponse(
  response: any,
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

//========================================================
//// This component was firstly used for login and signup but when I wanted to add stepper
//// for sign up I used another form that contains stepper and used it for sign up
//// so I added the purpose prop here but I ignored it after I added the stepper
//// so you may see checking purpose in the code ...
//========================================================

function AuthForm({
  purpose,
  extraField,
  extraLink,
  fields,
  defaultValues,
}: AuthFormProps) {
  const searchParams = useSearchParams();
  const redirectURL = searchParams.get("redirectto") || "/";
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
  // const { setAlertMessage, setIsError } = useAlert();
  const { 0: file, 1: setFile } = useState<null | any>("");
  const { 0: alertMessage, 1: setAlertMessage } = useState<string | null>(null);
  const { 0: isError, 1: setIsError } = useState<boolean>(false);
  const { 0: isLoading, 1: setIsLoading } = useState<boolean>(false);

  const handleFileChange = (event: any) => {
    setFile(event.target.files[0]);
    setValue("image", event.target.files[0]);
  };

  async function handleSubmitFn(data: any) {
    try {
      setIsLoading(true);
      setAlertMessage("");
      setIsError(false);

      const routeResponse = await instance.post("api/login", data, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (routeResponse.status !== 200) {
        setAlertMessage(routeResponse.data.error || "Server error");
        setIsError(true);
        setIsLoading(false);
      } else {
        setAlertMessage("Logged in successfully!");
        setIsError(false);
        dispatch(signIn(routeResponse.data.user));
        setIsLoading(false);
        setTimeout(() => {
          window.location.href = redirectURL;
        }, 2000);
      }
    } catch (error: any) {
      setIsLoading(false);

      // Check if it's an error from the response
      if (error.response) {
        // Server responded with a status other than 200
        setAlertMessage(error.response.data.error || "Server error");
        setIsError(true);
      } else {
        // Network or unexpected errors
        setAlertMessage("An unexpected error occurred: " + error.message);
        setIsError(true);
      }
      console.log(error.message);
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
          <div className="my-4 flex w-full justify-end">
            <Button variant="text" color="inherit">
              <Link href={extraLink}>{extraField}</Link>
            </Button>
          </div>
        )}
        <div className="mt-4 w-full">
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
