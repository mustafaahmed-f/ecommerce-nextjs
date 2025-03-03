"use client";
import { useCategories } from "@/app/_context/CategoriesProvider";
import { getCategories } from "@/app/_lib/APIs/categoriesAPIs";
import Link from "next/link";

function CategoriesOptions() {
  const { categories } = useCategories();
  return (
    <div className="sm:mb-0 mb-5">
      <ul className="flex items-center justify-center  list-none py-5 flex-wrap gap-3 sm:bg-white bg-slate-100  sm:gap-3 md:gap-16 sm:px-2 md:px-24 categoryList">
        {categories.categories.map((category: string, i: number) => (
          <Link
            href={`/products/${category}`}
            key={i}
            className="text-center cursor-pointer hover:text-sky-600"
          >
            {category}
          </Link>
        ))}
      </ul>
    </div>
  );
}

export default CategoriesOptions;
