import Image from "next/image";
import { logInGoogleAction } from "../_actions/authActions";
// import { signIn } from "../_lib/auth";

interface GoogleLogInBtnProps {}

function GoogleLogInBtn({}: GoogleLogInBtnProps) {
  return (
    <form action={logInGoogleAction} className="w-full">
      <button className="mx-auto flex w-full items-center justify-center gap-1 rounded-md border border-primary-300 px-1 py-3 text-base font-medium sm:px-7 md:gap-2 md:px-10 md:text-lg">
        <Image
          src="https://authjs.dev/img/providers/google.svg"
          alt="Google logo"
          height="24"
          width="24"
        />
        <span>Continue with Google</span>
      </button>
    </form>
  );
}

export default GoogleLogInBtn;
