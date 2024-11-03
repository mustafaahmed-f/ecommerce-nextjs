import Image from "next/image";
import { logInGoogleAction } from "../_actions/authActions";
// import { signIn } from "../_lib/auth";

interface GoogleLogInBtnProps {}

function GoogleLogInBtn({}: GoogleLogInBtnProps) {
  return (
    <form action={logInGoogleAction}>
      <button className="flex items-center gap-6 text-lg border border-primary-300 px-10 py-4 font-medium mx-auto">
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
