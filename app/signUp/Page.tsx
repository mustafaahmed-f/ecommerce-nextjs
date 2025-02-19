import SignUpStepper from "./_components/SignUpStepper";

function Page() {
  return (
    <div className="flex flex-col justify-center w-full px-2 mt-10 py-5 mx-auto bg-primary-200 md:w-1/2 sm:px-3">
      <div className="my-auto bg-white rounded-md bg-opacity-90 px-4 sm:px-9 py-9 opacity-80 backdrop-blur-xl lg:py-10">
        <h2 className="mb-10 text-3xl lg:text-4xl">Sign up</h2>

        <SignUpStepper />
      </div>
    </div>
  );
}

export default Page;
