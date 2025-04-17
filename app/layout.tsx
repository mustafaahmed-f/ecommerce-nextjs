import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Footer from "./_components/Footer/Footer";
import Header from "./_components/Header/Header";
import { getCategories } from "./_lib/APIs/categoriesAPIs";
import { getAllProducts } from "./_lib/APIs/productsAPIs";

import connectDB from "./_mongodb/dbConnect";
import { Josefin_sans } from "./_styles/fonts";
import "./_styles/globals.css";
import AuthHandler from "./_context/AuthHandler";
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
  await connectDB();
  const { 0: categories, 1: products } = await Promise.all([
    getCategories(),
    getAllProducts(),
  ]);

  // console.log("Categories : ", categories);

  return (
    <html lang="en">
      <body
        className={`${Josefin_sans.variable} max-w-screen grid min-h-screen grid-rows-[auto_1fr] antialiased max-sm:relative`}
        suppressHydrationWarning
      >
        <AuthHandler
          intitialCategories={
            categories.success ? categories : { categories: [] }
          }
          initialProducts={products.success ? products.products : []}
        >
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
