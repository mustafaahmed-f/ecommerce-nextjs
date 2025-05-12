import { FormProvider } from "@/app/_context/FormContext";
import FormRenderer from "@/app/cartcheckout/_components/FormRenderer";
import { defaultValuesType } from "@/app/cartcheckout/_types/defaultValuesType";
import { checkOutFormValidations } from "@/app/cartcheckout/_utils/formValidation";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@mui/material";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { ediFormFieldsObject } from "../_utils/editFormFieldsObject";

interface EditOrderFormProps {
  defaultValues: defaultValuesType;
}

//// In this form, we will use the chekcoutFormValidations type because they have common fields
//// and also we will have more complixity to create a new form provider with other type so I found
//// it is more easy to use same types but before submission I only get values of userInfo.

export type CheckOutFormValues = yup.InferType<typeof checkOutFormValidations>;

function EditOrderForm({ defaultValues }: EditOrderFormProps) {
  const methods = useForm<CheckOutFormValues>({
    resolver: yupResolver(checkOutFormValidations),
    mode: "onChange",
    reValidateMode: "onChange",
    criteriaMode: "firstError",
    defaultValues,
  });
  const {
    watch,
    formState: { isValid, errors },
    // getValues,
  } = methods;

  async function onSubmit(data: CheckOutFormValues) {
    const dataObj = data.userInfo;
    console.log(dataObj);
  }

  return (
    <form onSubmit={methods.handleSubmit(onSubmit)}>
      <FormProvider value={methods}>
        <section className="w-full px-1 py-5 sm:px-4 md:px-8">
          <FormRenderer fields={ediFormFieldsObject} />
        </section>
        <div className="mt-5 flex items-center justify-end">
          <Button variant="outlined" type="submit" disabled={!isValid}>
            Edit
          </Button>
        </div>
      </FormProvider>
    </form>
  );
}

export default EditOrderForm;
