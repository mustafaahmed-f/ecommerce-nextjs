import { getCategories } from "@/app/_lib/APIs/categoriesAPIs";
import React from "react";

interface pageProps {
  params: any;
}

export async function generateStaticParams() {
  const categories = await getCategories();

  return categories;
}

function page({ params }: pageProps) {
  return <div></div>;
}

export default page;
