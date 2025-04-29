"use client";

import { useCart } from "@/app/_context/CartProvider";
import { defaultValuesType } from "../_types/defaultValuesType";
import { inputFieldType } from "../_types/inputFieldType";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { checkOutFormValidations } from "../_utils/formValidation";
import * as yup from "yup";

interface CheckOutFormTemplateProps {
  defaultValues: defaultValuesType;
  formFields: inputFieldType[];
}

type CheckOutFormValues = yup.InferType<typeof checkOutFormValidations>;

function CheckOutFormTemplate({
  defaultValues,
  formFields,
}: CheckOutFormTemplateProps) {
  const { cart } = useCart();

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors, isValid },
  } = useForm<CheckOutFormValues>({
    resolver: yupResolver(checkOutFormValidations),
    mode: "onChange",
    reValidateMode: "onChange",
    criteriaMode: "firstError",
    defaultValues,
  });

  return <div></div>;
}

export default CheckOutFormTemplate;
