import { getCategories } from "@/app/_lib/APIs/categoriesAPIs";
import HeadersWrapper from "./HeadersWrapper";
import { getAllProducts } from "@/app/_lib/APIs/productsAPIs";
import { instance } from "@/app/_lib/axiosInstance";
import { verifyToken } from "@/app/_lib/tokenMethods";
import { cookies } from "next/headers";
import { auth } from "@/app/_lib/auth";
import { checkOnRedis } from "@/app/_lib/checkOnRedis";
import { getCookie } from "@/app/_lib/getCookie";
import { checkUserInDB } from "@/app/_lib/checkUserInDB";

interface HeaderProps {}

async function Header({}: HeaderProps) {
  let systemUser = null;
  let googleUser = null;
  const session = await auth();

  if (session?.user) {
    googleUser = session.user;
    // const checkUserChecked = await checkOnRedis(googleUser.userId!);

    //TODO : Try to use cookie instead of called redis to avoid re-check same user multiple times

    // const checkToken = cookies().get("next_ecommerce_check_user");
    // if (checkToken) {
    //   let decoded;
    //   try {
    //     decoded = JSON.parse(
    //       Buffer.from(token.split(".")[1], "base64").toString()
    //     );
    //     if (!decoded || !decoded.provider) {
    //       return NextResponse.json(
    //         { error: "Invalid token structure" },
    //         { status: 400 }
    //       );
    //     }
    //   } catch (error) {
    //     return NextResponse.json(
    //       { error: "Invalid token structure" },
    //       { status: 400 }
    //     );
    //   }
    // } else {
    //   await checkUserInDB(googleUser);
    // }

    // if (!checkUserChecked) {
    //   await checkUserInDB(googleUser);
    // }
  }

  if (!session?.user) {
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
          systemUser = response.data;
        }

        // Assuming the token contains user info; if not, fetch it from the DB/API
      } catch (error) {
        console.error("Invalid token", error);
      }
    }
  }

  let finalUser = systemUser
    ? systemUser
    : googleUser
    ? {
        email: googleUser.email,
        firstName: googleUser.name.split(" ")[0],
        lastName: googleUser.name.split(" ")[1],
        userName: googleUser.name.split(" ").join(""),
        provider: "google",
        profileImage: googleUser.image,
      }
    : null;

  return (
    <header>
      <HeadersWrapper loggedUser={finalUser} />
    </header>
  );
}

export default Header;
