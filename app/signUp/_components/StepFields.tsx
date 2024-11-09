import AuthInputfield from "@/app/_components/Auth/AuthInputField";
import { getFullAddress } from "@/app/_lib/getAddress";
import { Button } from "@mui/material";
import { UseFormSetValue } from "react-hook-form";

interface StepFieldsProps {
  errors: any;
  register: (s: string) => {};
  fields: { field: string; label: string }[];
  isRequired?: boolean;
  setAddress?: boolean;
  setValue?: UseFormSetValue<any>;
}

function StepFields({
  fields,
  errors,
  register,
  isRequired = false,
  setAddress = false,
  setValue,
}: StepFieldsProps) {
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
    <>
      {setAddress && (
        <div className="w-full text-center">
          <Button
            color="inherit"
            variant="outlined"
            onClick={handleGetAddress}
            className="mt-5"
          >
            Get your address
          </Button>
        </div>
      )}
      {fields.map((field, i) => (
        <AuthInputfield
          key={i}
          errors={errors}
          register={register}
          field={field["field"]}
          label={field["label"]}
          required={isRequired}
        />
      ))}
    </>
  );
}

export default StepFields;
