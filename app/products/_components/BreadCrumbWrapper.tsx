"use client";

import { useParams } from "next/navigation";
import BreadCrumb from "./BreadCrumb";

interface BreadCrumbWrapperProps {}

function BreadCrumbWrapper({}: BreadCrumbWrapperProps) {
  const { category } = useParams();
  const breadCrumbOptions = category
    ? [
        {
          label: "Home",
          href: "/",
        },
        {
          label: "Products",
          href: "/products",
        },
        {
          label: category as string,
          href: `/products/${category}`,
          current: true,
        },
      ]
    : [];
  return breadCrumbOptions.length ? (
    <div className="categoryList flex w-full list-none items-center justify-start bg-white px-2 py-5 max-sm:bg-slate-100 sm:gap-3 sm:px-8 md:mx-0 md:gap-16 md:px-20">
      <BreadCrumb breadCrumbOptions={breadCrumbOptions} />
    </div>
  ) : null;
}

export default BreadCrumbWrapper;
