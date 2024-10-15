import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import { Josefin_sans } from "./_styles/fonts";
import "./_styles/globals.css";

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
  return (
    <html lang="en">
      <body className={`${Josefin_sans.variable} antialiased`}>{children}</body>
    </html>
  );
}
