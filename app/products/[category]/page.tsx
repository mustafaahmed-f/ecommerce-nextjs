import { getCategories } from "@/app/_lib/APIs/categoriesAPIs";
import React from "react";

interface pageProps {
  params: any;
}

export async function generateStaticParams() {
  const categories = await getCategories();

  return categories.categories.map((category: string) => ({
    params: { category },
  }));
}

function page({ params }: pageProps) {
  const { category } = params;

  return <div>{`Category: ${category}`}</div>;
}

export default page;
