import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import Footer from "./_components/Footer/Footer";
import GlobalAlertWrapper from "./_components/GlobalAlertWrapper";
import Header from "./_components/Header/Header";
import { Josefin_sans } from "./_styles/fonts";
import "./_styles/globals.css";
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${Josefin_sans.variable} antialiased min-h-screen grid grid-rows-[auto_1fr] max-w-screen`}
        suppressHydrationWarning
      >
        <GlobalAlertWrapper />
        <Header />
        <main className="flex flex-grow overflow-x-auto pt-[124px] sm:pt-0 pb-2 max-md:px-4 max-sm:px-2 ">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
