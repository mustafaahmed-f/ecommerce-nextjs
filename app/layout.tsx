import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import Footer from "./_components/Footer/Footer";
import Header from "./_components/Header/Header";
import { getCategories } from "./_lib/APIs/categoriesAPIs";
import { getAllProducts, getCachedProducts } from "./_lib/APIs/productsAPIs";
import connectDB from "./_mongodb/dbConnect";
import { Josefin_sans } from "./_styles/fonts";
import "./_styles/globals.css";
import { Providers } from "./Providers";
import { Suspense } from "react";
import Spinner from "./_components/Spinner";
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
    getCachedProducts(),
  ]);

  // console.log("Categories : ", categories);

  return (
    <html lang="en">
      <body
        className={`${Josefin_sans.variable} antialiased min-h-screen grid grid-rows-[auto_1fr] max-w-screen`}
        suppressHydrationWarning
      >
        <Providers
          intitialCategories={
            categories.success ? categories : { categories: [] }
          }
          initialProducts={products.success ? products.products : []}
        >
          <Header />
          <main className="flex flex-grow overflow-x-auto pt-[124px] sm:pt-0 pb-2 max-md:px-4 max-sm:px-2 ">
            {children}
          </main>
        </Providers>
        <Footer />
      </body>
    </html>
  );
}
