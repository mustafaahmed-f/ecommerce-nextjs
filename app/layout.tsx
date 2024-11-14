import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import Footer from "./_components/Footer/Footer";
import GlobalAlertWrapper from "./_components/GlobalAlertWrapper";
import Header from "./_components/Header/Header";
import { auth } from "./_lib/auth";
import { instance } from "./_lib/axiosInstance";
import { verifyToken } from "./_lib/tokenMethods";
import { Josefin_sans } from "./_styles/fonts";
import "./_styles/globals.css";
import { checkOnRedis } from "./_lib/checkOnRedis";
// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s - Luminae store",
    default: "Welcome to Luminae store",
  },
  description: "Welcome to Luminae store. The best online store for shopping.",
  icons: {
    icon: "/icons8-cart-40.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let systemUser = null;
  let googleUser = null;
  const session = await auth();
  if (session?.user) {
    googleUser = session.user;
    const checkUserChecked = await checkOnRedis(googleUser.userId!);

    if (!checkUserChecked) {
      const response = await fetch(
        `${process.env.NEXTAUTH_URL}api/user/check`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: googleUser.email,
            name: googleUser.name,
            image: googleUser.image,
          }),
        }
      );
    }
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
        // console.error("Invalid token", error);
      }
    }
  }

  return (
    <html lang="en">
      <body
        className={`${Josefin_sans.variable} antialiased min-h-screen grid grid-rows-[auto_1fr] max-w-screen`}
        suppressHydrationWarning
      >
        <GlobalAlertWrapper />
        <Header
          isLoggedIn={systemUser || googleUser}
          provider={systemUser ? "system" : googleUser ? "google" : ""}
        />
        <main className="flex flex-grow overflow-x-auto pt-[124px] sm:pt-0 pb-2 max-md:px-4 max-sm:px-2 ">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
