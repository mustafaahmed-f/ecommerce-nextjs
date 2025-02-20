import BreadCrumb from "@/app/_components/BreadCrumb";
import {
  getCategories,
  getProductsByCategories,
} from "@/app/_lib/APIs/categoriesAPIs";
import React from "react";

interface pageProps {
  params: any;
}

export const revalidate = 3600 * 24;

export async function generateStaticParams() {
  const categories = await getCategories();

  return categories.categories.map((category: string) => ({
    params: { category },
  }));
}

async function page({ params }: pageProps) {
  const { category } = params;
  const products = await getProductsByCategories(category);

  const breadCrumbOptions = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: category,
      href: `/products/${category}`,
      current: true,
    },
  ];

  // console.log(`PRoducts of category ${category} : `, products);

  return (
    <>
      {/* Breadcrumb section */}

      <div className="flex items-center justify-start bg-slate-100 w-full  list-none py-5  sm:gap-3 md:gap-16 sm:px-4 md:px-20 categoryList">
        <BreadCrumb breadCrumbOptions={breadCrumbOptions} />
      </div>
    </>
  );
}

export default page;
