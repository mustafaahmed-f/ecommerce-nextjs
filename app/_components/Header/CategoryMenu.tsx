import { useCategories } from "@/app/_context/CategoriesProvider";
import React from "react";

interface CategoryMenuProps {}

function CategoryMenu({}: CategoryMenuProps) {
  const { categories } = useCategories();
  return (
    <ul className="flex absolute z-[999999px] rounded-bl-md rounded-br-md flex-col translate-y-[104%] -bottom-0 left-0 bg-neutral-300">
      {categories.map((el, i) => (
        <div key={i} className="py-3 px-4 hover:bg-neutral-400">
          {el}
        </div>
      ))}
    </ul>
  );
}

export default CategoryMenu;
