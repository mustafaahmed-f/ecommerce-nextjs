import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { Metadata } from "next";
import Footer from "./_components/Footer/Footer";
import Header from "./_components/Header/Header";

import AuthHandler from "./_context/AuthHandler";
import connectDB from "./_mongodb/dbConnect";
import { Josefin_sans } from "./_styles/fonts";
import "./_styles/globals.css";

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
  await connectDB();

  return (
    <html lang="en">
      <body
        className={`${Josefin_sans.variable} max-w-screen grid min-h-screen grid-rows-[auto_1fr] antialiased max-sm:relative`}
        suppressHydrationWarning
      >
        <AuthHandler>
          <ReactQueryDevtools initialIsOpen={false} />
          <Header />
          <main className="flex flex-grow overflow-hidden overflow-x-auto pb-2 pt-[124px] max-sm:px-2 sm:pt-0">
            {children}
          </main>
          <Footer />
        </AuthHandler>
      </body>
    </html>
  );
}
