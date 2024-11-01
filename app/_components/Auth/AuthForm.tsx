import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import AuthInputfield from "./AuthInputField";
import AuthButton from "./AuthButton";
import Link from "next/link";
interface AuthFormProps {
  mySchema: Yup.ObjectSchema<any>;
  purpose: string;
  extraField: string;
  extraLink: string;
  defaultValues?: { email: string; password: string };
  isLoading: boolean;
  fields: { field: string; label: string }[];
  submitFunction: (data: any) => void;
}

function AuthForm({
  mySchema,
  purpose,
  extraField,
  extraLink,
  fields,
  submitFunction,
  defaultValues,
  isLoading = false,
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

  async function handleSubmitFn(data: any) {
    await submitFunction(data);
  }

  return (
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
          {isLoading ? "Loading..." : purpose}
        </AuthButton>
      </div>
    </form>
  );
}

export default AuthForm;
