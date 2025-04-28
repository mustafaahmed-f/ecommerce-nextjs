"use client";
import { useCategories } from "@/app/_context/CategoriesProvider";
import { getCategories } from "@/app/_lib/APIs/categoriesAPIs";
import Link from "next/link";

function CategoriesOptions() {
  const { categories } = useCategories();
  return (
    <div className="mb-5 sm:mb-0">
      <ul className="categoryList flex list-none flex-wrap items-center justify-center gap-3 bg-slate-100 py-5 sm:gap-3 sm:bg-white sm:px-2 md:gap-16 md:px-24">
        <Link
          href={`/products`}
          key={"All"}
          className="cursor-pointer text-center font-semibold hover:text-sky-600"
        >
          All Categories
        </Link>
        {categories.categories.map((category: string, i: number) => (
          <Link
            href={`/products/${category}`}
            key={i}
            className="cursor-pointer text-center hover:text-sky-600"
          >
            {category.substring(0, 1).toUpperCase() + category.substring(1)}
          </Link>
        ))}
      </ul>
    </div>
  );
}

export default CategoriesOptions;
