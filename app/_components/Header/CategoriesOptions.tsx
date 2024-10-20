import React from "react";

interface CategoriesOptionsProps {}

function CategoriesOptions({}: CategoriesOptionsProps) {
  return (
    <div className="">
      <ul className="flex items-center justify-center pb-5 list-none md:pt-12 sm:pt-10 sm:gap-3 md:gap-16 sm:px-2 md:px-24 categoryList">
        <li className="text-center cursor-pointer hover:text-sky-600">
          electronics
        </li>
        <li className="text-center cursor-pointer hover:text-sky-600">
          clothing
        </li>
        <li className="text-center cursor-pointer hover:text-sky-600">
          home and kitchen
        </li>
        <li className="text-center cursor-pointer hover:text-sky-600">
          beauty and personal care
        </li>
        <li className="text-center cursor-pointer hover:text-sky-600">
          sports and outdoors
        </li>
        <li className="text-center cursor-pointer hover:text-sky-600">
          books and stationery
        </li>
        <li className="text-center cursor-pointer hover:text-sky-600">
          health & wellness
        </li>
      </ul>
    </div>
  );
}

export default CategoriesOptions;
