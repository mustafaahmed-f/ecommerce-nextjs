import SignUpStepper from "./_components/SignUpStepper";

export const metadata = {
  title: "Sign up - Luminae Store",
};
function Page() {
  return (
    <div className="mx-auto mt-10 flex w-full flex-col justify-center rounded-lg bg-primary-200 px-2 py-4 sm:px-3 md:w-1/2">
      <div className="my-auto overflow-y-auto rounded-md bg-white bg-opacity-90 px-4 py-9 opacity-80 backdrop-blur-xl sm:px-9 lg:py-10">
        <h2 className="mb-10 text-3xl lg:text-4xl">Sign up</h2>

        <SignUpStepper />
      </div>
    </div>
  );
}

export default Page;
