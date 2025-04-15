import { cookies } from "next/headers";
import UserProvider from "../_context/UserProvider";
import { Providers } from "../Providers";
import { auth } from "./auth";
import { instance } from "./axiosInstance";
import { verifyToken } from "./tokenMethods";
import { first } from "lodash";
import { User } from "./store/slices/userSlice/userSlice.types";
import userModel from "../_mongodb/models/userModel";

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
  console.log("Auth handler called");
  let user: User | null = null;
  const session = await auth();
  if (session?.user) {
    const userInfoFromDB = await userModel.findOne({
      email: session.user.email,
    });
    user = {
      id: String(userInfoFromDB?._id),
      email: session.user.email,
      userName: userInfoFromDB.userName,
      phoneNumber: userInfoFromDB.phoneNumber,
      firstName: session.user.name.split(" ")[0],
      lastName: session.user.name.split(" ")[1],
      provider: "google",
      profileImage: session.user.image,
      role: "user",
    };
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
