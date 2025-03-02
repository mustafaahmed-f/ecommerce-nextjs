import { cookies } from "next/headers";
import UserProvider from "../_context/UserProvider";
import { Providers } from "../Providers";
import { auth } from "./auth";
import { instance } from "./axiosInstance";
import { verifyToken } from "./tokenMethods";

interface AuthHandlerProps {
  children: React.ReactNode;
  intitialCategories: any;
  initialProducts: any[];
}

async function AuthHandler({
  children,
  intitialCategories,
  initialProducts,
}: AuthHandlerProps) {
  let user = null;
  const session = await auth();
  if (session?.user) {
    user = session.user;
  } else {
    const token = cookies().get("next_ecommerce_token")?.value;
    if (token) {
      try {
        // Verify token and decode user info
        const decoded: any = verifyToken({ token });
        const response = await instance.get(`api/user/${decoded.id}`, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });

        if (response.status === 200) {
          user = response.data;
        }

        // Assuming the token contains user info; if not, fetch it from the DB/API
      } catch (error) {
        console.error("Invalid token", error);
      }
    }
  }

  // console.log("User in auth handler : ", user);

  return (
    <Providers
      intitialCategories={intitialCategories}
      initialProducts={initialProducts}
    >
      <UserProvider user={user}>{children}</UserProvider>
    </Providers>
  );
}

export default AuthHandler;
