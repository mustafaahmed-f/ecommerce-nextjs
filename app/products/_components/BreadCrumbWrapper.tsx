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
          label: category as string,
          href: `/products/${category}`,
          current: true,
        },
      ]
    : [];
  return breadCrumbOptions.length ? (
    <div className="flex items-center justify-start max-sm:bg-slate-100 bg-white w-full md:mx-0 px-2 list-none py-5  sm:gap-3 md:gap-16  sm:px-8 md:px-20 categoryList">
      <BreadCrumb breadCrumbOptions={breadCrumbOptions} />
    </div>
  ) : null;
}

export default BreadCrumbWrapper;
