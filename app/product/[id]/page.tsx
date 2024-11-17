import { getAllProducts } from "@/app/_lib/APIs/productsAPIs";
import React, { ParamHTMLAttributes } from "react";

interface PageProps {
  params: any;
}

export async function generateStaticParams() {
  const products = await getAllProducts();

  return products.products.map((product: any) => ({
    params: { id: product.id },
  }));
}

function Page({ params }: PageProps) {
  return <div>{params.id}</div>;
}

export default Page;
