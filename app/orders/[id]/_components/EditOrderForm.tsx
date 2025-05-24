import { Button } from "@/app/_components/shadcn/button";
import { instance } from "@/app/_lib/axiosInstance";
import { getAxiosErrMsg } from "@/app/_lib/getAxiosErrMsg";
import FormRenderer from "@/app/cartcheckout/_components/FormRenderer";
import { defaultValuesType } from "@/app/cartcheckout/_types/defaultValuesType";
import { checkOutFormValidations } from "@/app/cartcheckout/_utils/formValidation";
import { useToast } from "@/hooks/use-toast";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { ediFormFieldsObject } from "../_utils/editFormFieldsObject";

interface EditOrderFormProps {
  defaultValues: defaultValuesType;
  orderId: string;
}

//// In this form, we will use the chekcoutFormValidations type because they have common fields
//// and also we will have more complixity to create a new form provider with other type so I found
//// it is more easy to use same types but before submission I only get values of userInfo.

export type CheckOutFormValues = yup.InferType<typeof checkOutFormValidations>;

function EditOrderForm({ defaultValues, orderId }: EditOrderFormProps) {
  const router = useRouter();
  const { 0: isLoading, 1: setIsLoading } = useState<boolean>(false);
  const { toast } = useToast();
  const methods = useForm<CheckOutFormValues>({
    resolver: yupResolver(checkOutFormValidations),
    mode: "onChange",
    reValidateMode: "onChange",
    criteriaMode: "firstError",
    defaultValues,
  });
  const {
    setValue,
    watch,
    trigger,
    register,
    formState: { errors, isValid },
  } = methods;

  async function onSubmit(data: CheckOutFormValues) {
    const dataObj = data.userInfo;
    setIsLoading(true);
    try {
      const response = await instance.put(
        `/api/order?orderId=${orderId}`,
        dataObj,
      );
      if (response.data.success) {
        toast({
          description: "Order edited successfully",
          variant: "success",
        });
      }
      setIsLoading(false);
      router.refresh();
    } catch (error: any) {
      setIsLoading(false);
      const errMsg = getAxiosErrMsg(error);
      toast({
        description: errMsg,
        variant: "destructive",
      });
    }
    console.log(dataObj);
  }

  return (
    <form
      onSubmit={methods.handleSubmit(onSubmit)}
      className={`${isLoading ? "pointer-events-none opacity-40" : ""}`}
    >
      <section className="w-full px-1 py-5 sm:px-4 md:px-8">
        <FormRenderer<CheckOutFormValues>
          fields={ediFormFieldsObject}
          watch={watch}
          setValue={setValue}
          trigger={trigger}
          register={register}
          errors={errors}
          control={methods.control}
        />
      </section>
      <div className="mt-5 flex items-center justify-end px-1 sm:px-4 md:px-8">
        <Button variant="secondary" type="submit" disabled={!isValid}>
          Edit
        </Button>
      </div>
    </form>
  );
}

export default EditOrderForm;
