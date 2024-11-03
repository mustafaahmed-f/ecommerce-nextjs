import React from "react";
import AuthForm from "../_components/Auth/AuthForm";
import { signupValidations } from "../_lib/validationSchemas/signUpValidations";
import { Providers } from "../Providers";

interface PageProps {}

function Page({}: PageProps) {
  const fieldsArr = [
    { field: "userName", label: "Username" },
    { field: "firstName", label: "First Name" },
    { field: "lastName", label: "Last Name" },
    { field: "email", label: "Email" },
    { field: "password", label: "Password" },
    { field: "rePassword", label: "Re-Password" },
    { field: "address.unit_number", label: "Unit Number" },
    { field: "address.street_number", label: "Street Number" },
    { field: "address.address_line1", label: "Address Line 1" },
    { field: "address.address_line2", label: "Address Line 2" },
    { field: "address.city", label: "City" },
    { field: "address.country", label: "Country" },
    { field: "address.geolocation.lat", label: "Latitude" },
    { field: "address.geolocation.long", label: "Longitude" },
  ];
  return (
    <div className="flex flex-col justify-center w-full px-2 py-5 mx-auto bg-primary-200 md:w-1/2 sm:px-3">
      <div className="my-auto bg-white rounded-md bg-opacity-90 px-9 py-9 opacity-80 backdrop-blur-xl lg:py-10">
        <h2 className="mb-10 text-3xl lg:text-4xl">Sign up</h2>
        <Providers>
          <AuthForm
            fields={fieldsArr}
            purpose={"Sign up"}
            extraField={"Already have acccount ?"}
            extraLink="/login"
          />
        </Providers>
      </div>
    </div>
  );
}

export default Page;
