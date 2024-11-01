import React from "react";

interface AuthInputfieldProps {
  errors: any;
  field: string;
  label: string;
  defaultValue?: string | null;
  register: (s: string) => {};
}

function AuthInputfield({
  errors,
  field,
  label,
  register,
  defaultValue,
}: AuthInputfieldProps) {
  const [showPass, setShowPass] = React.useState(false);
  return (
    <div className="flex flex-col justify-between w-full gap-2 mt-8 align-middle ">
      <label htmlFor={`${field}`}>{label} : </label>
      <div className="flex flex-col flex-grow w-full">
        <input
          autoComplete="off"
          defaultValue={defaultValue ?? ""}
          id={`${field}`}
          {...register(`${field}`)}
          type={
            (field === "password" || field === "rePassword") && !showPass
              ? "password"
              : "text"
          }
          placeholder={`enter your ${label} ...`}
          className={`rounded-full w-full focus:ring-secondary-100 bg-gray-200 px-4 py-1 ring placeholder:text-xs placeholder:sm:text-base ${
            errors[`${field}`] ? `ring-red-400` : `ring-transparent`
          } focus:outline-0   `}
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
          {errors[`${field}`] && errors[`${field}`]?.message}
        </p>
      </div>
    </div>
  );
}

export default AuthInputfield;
