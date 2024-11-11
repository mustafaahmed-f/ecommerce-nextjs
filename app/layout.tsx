import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import Footer from "./_components/Footer/Footer";
import Header from "./_components/Header/Header";
import { Josefin_sans } from "./_styles/fonts";
import "./_styles/globals.css";
import GlobalAlertWrapper from "./_components/GlobalAlertWrapper";
import { cookies } from "next/headers";
import { verifyToken } from "./_lib/tokenMethods";
// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s - M store",
    default: "Welcome to M store",
  },
  description: "Welcome to M store. The best online store for shopping.",
  icons: {
    icon: "/icons8-cart-40.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const token = cookies().get("next_ecommerce_token")?.value;

  let user = null;
  if (token) {
    try {
      // Verify token and decode user info
      const decoded: any = verifyToken({ token });

      // Assuming the token contains user info; if not, fetch it from the DB/API
      user = {
        id: decoded.id,
        email: decoded.email,
        ...decoded, // Any additional user info encoded in the token
      };
    } catch (error) {
      console.error("Invalid token", error);
    }
  }

  console.log(user);

  return (
    <html lang="en">
      <body
        className={`${Josefin_sans.variable} antialiased min-h-screen grid grid-rows-[auto_1fr] max-w-screen`}
        suppressHydrationWarning
      >
        <GlobalAlertWrapper />
        <Header />
        <main className="flex flex-grow overflow-x-auto pt-[124px] sm:pt-0 pb-2 max-md:px-4 max-sm:px-2 my-10">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
