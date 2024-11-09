import React from "react";
import { get } from "lodash";
import { match } from "ts-pattern";
interface AuthInputfieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  errors: any;
  register: (s: string) => {};
  field: string;
  label: string;
  defaultValues?: string | number | readonly string[] | undefined;
}

function AuthInputfield({
  errors,
  register,
  field,
  label,
  defaultValues,
  ...props
}: AuthInputfieldProps) {
  const [showPass, setShowPass] = React.useState(false);

  const isNumber =
    field === "address.unit_number" ||
    field === "address.street_number" ||
    field === "address.geolocation.lat" ||
    field === "address.geolocation.long";

  return (
    <div className="flex flex-col justify-between w-full gap-2 mt-8 align-middle ">
      <label htmlFor={`${field}`}>{label} : </label>
      <div className="flex flex-col flex-grow w-full">
        <input
          min={props.type === "number" ? 0 : undefined}
          autoComplete="off"
          defaultValue={match(defaultValues)
            .with(undefined, () =>
              match(isNumber)
                .with(true, () => 0)
                .otherwise(() => "")
            )
            .otherwise(() => defaultValues)}
          id={`${field}`}
          {...register(`${field}`)}
          type={match(
            (field === "password" || field === "rePassword") && !showPass
          )
            .with(true, () => "password")
            .with(false, () => props.type)
            .otherwise(() => props.type)}
          placeholder={`enter your ${label} ...`}
          className={`rounded-full w-full focus:ring-secondary-100 bg-gray-200 px-4 py-1 ring placeholder:text-xs placeholder:sm:text-base ${
            get(errors, field) ? `ring-red-400` : `ring-transparent`
          } focus:outline-0   `}
          {...props}
        />
        {field === "password" && (
          <div className="flex items-center gap-1 px-2 py-1">
            <input
              type="checkbox"
              onChange={(e) => setShowPass(e.target.checked)}
            />
            <span>Show password</span>
          </div>
        )}
        <p className="mt-1 mb-0 text-red-600 ">
          {get(errors, field) && get(errors, field)?.message}
        </p>
      </div>
    </div>
  );
}

export default AuthInputfield;
