"use client";

import { yupResolver } from "@hookform/resolvers/yup";

import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import GoogleLogInBtn from "../_components/GoogleLogInBtn";
import { Button } from "../_components/shadcn/button";
import AutoFixHighIconSVG from "../_icons/AutoFixHighIconSVG";
import FavoriteIconSVG from "../_icons/FavoriteIconSVG";
import SettingsIconSVG from "../_icons/SettingsIconSVG";
import ThumbUpIconSVG from "../_icons/ThumbUpIconSVG";
import { instance } from "../_lib/axiosInstance";
import { getAxiosErrMsg } from "../_lib/getAxiosErrMsg";
import { loginValidations } from "../_lib/validationSchemas/logInValidations";
import FormRenderer from "../cartcheckout/_components/FormRenderer";
import { logInDefaultValues } from "./_utils/logInDefaultValues";
import { logInFieldsObject } from "./_utils/logInFieldsObject";
interface PageProps {}

const mainPragraphs = [
  "Discover a wide range of high-quality products carefully curated to meet your needs, from the latest electronics to everyday essentials.",
  "Enjoy fast, reliable shipping and top-notch customer service that ensures a seamless shopping experience every time you visit.",
  "Shop with confidence knowing you're getting the best deals on the market, with unbeatable prices and special discounts available every week.",
  "Your satisfaction is our priority. We offer a hassle-free return policy and dedicated support to make your shopping experience stress-free and enjoyable.",
];

export type logInFormValues = yup.InferType<typeof loginValidations>;

function Page({}: PageProps) {
  const { 0: isLoading, 1: setIsLoading } = useState<boolean>(false);
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const redirectURL = searchParams.get("redirectto") || "/";
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    trigger,
    formState: { errors, isValid },
  } = useForm<logInFormValues>({
    resolver: yupResolver(loginValidations),
    mode: "onChange",
    reValidateMode: "onChange",
    criteriaMode: "firstError",
    defaultValues: logInDefaultValues,
  });

  async function handleSubmitFn(data: any) {
    try {
      setIsLoading(true);
      // setAlertMessage("");
      // setIsError(false);

      const routeResponse = await instance.post("api/login", data, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (routeResponse.status !== 200) {
        toast({
          description: routeResponse.data.error || "Server error",
          variant: "destructive",
        });
        setIsLoading(false);
      } else {
        toast({
          description: "Logged in successfully!",
          variant: "success",
        });
        setIsLoading(false);
        setTimeout(() => {
          window.location.href = redirectURL;
        }, 2000);
      }
    } catch (error: any) {
      const errMsg = getAxiosErrMsg(error);
      toast({
        description: errMsg,
        variant: "destructive",
      });
      setIsLoading(false);
    }
  }

  return (
    <div className="mt-10 flex w-full items-center justify-center px-6 max-sm:mb-10 sm:px-12">
      <div className="hidden w-1/2 p-4 sm:flex-col sm:items-center md:flex">
        <h2 className="mb-3 text-center text-3xl font-bold">
          Log in and get started with the best shopping experience
        </h2>
        {mainPragraphs.map((el, i) => (
          <div
            key={i}
            className="my-4 flex items-center gap-3 text-lg font-semibold"
          >
            {i === 0 && <SettingsIconSVG />}
            {i === 1 && <ThumbUpIconSVG />}
            {i === 2 && <FavoriteIconSVG />}
            {i === 3 && <AutoFixHighIconSVG />}
            <p>{el}</p>
          </div>
        ))}
      </div>
      <div
        className={`${isLoading ? "pointer-events-none opacity-40" : ""} mx-auto flex max-w-96 flex-col justify-center rounded-md bg-primary-200 px-2 py-3 sm:px-3 md:w-1/2 md:px-4 md:py-5`}
      >
        <div className="my-auto rounded-md bg-white bg-opacity-90 px-4 py-7 opacity-80 backdrop-blur-xl md:px-7 md:py-10">
          <h2 className="mb-10 text-3xl font-semibold lg:text-4xl">Sign in</h2>

          <form onSubmit={handleSubmit(handleSubmitFn)} className="mb-3 mt-5">
            <FormRenderer<logInFormValues>
              fields={logInFieldsObject}
              control={control}
              errors={errors}
              watch={watch}
              setValue={setValue}
              trigger={trigger}
              register={register}
            />
            <Button
              disabled={!isValid}
              type="submit"
              variant={"default"}
              className="mt-3 h-full w-full rounded-md py-3 text-lg font-semibold"
            >
              {isLoading ? "Logging in..." : "Log in"}
            </Button>
          </form>
          <GoogleLogInBtn />
          <Link href="/signUp">
            <p className="mt-3 text-center text-sm hover:text-sky-600">
              Don&apos;t have an account ? Sign up
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Page;
