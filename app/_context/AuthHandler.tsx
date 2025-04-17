import { cookies } from "next/headers";
import UserProvider from "../_context/UserProvider";
import { Providers } from "../Providers";
import userModel from "../_mongodb/models/userModel";
import { User } from "../_lib/store/slices/userSlice/userSlice.types";
import { auth } from "../_lib/auth";
import { verifyToken } from "../_lib/tokenMethods";
import { instance } from "../_lib/axiosInstance";

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
