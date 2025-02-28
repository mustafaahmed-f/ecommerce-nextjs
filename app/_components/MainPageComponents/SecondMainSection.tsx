"use client";

import React from "react";
import HomeHeadlines from "./HomeHeadlines";
import FreshSalesCard from "./FreshSalesCard";
import TrendingMustHaveCard from "./TrendingMustHaveCard";
import MainProductsCard from "./MainProductsCard";
import { useCategories } from "@/app/_context/CategoriesProvider";

function SecondMainSection({}) {
  const { products } = useCategories();
  console.log("Products : ", products);
  const freshSalesProducts: any[] = products.slice(products.length - 4);
  const trending: any[] = products.slice(50, 53);
  const top100: any[] = products.slice(20, 24);

  if (!products.length)
    return <p className="text-center w-full">Loading products ...</p>;

  return (
    <div className="flex flex-col gap-16 px-5 sm:px-16 sm:pt-16 ">
      {/* ////First sub section : fresh sales */}

      <div>
        <HomeHeadlines headline="fresh sales" />
        <div className="grid flashSalesSection md:grid-cols-[1fr_1fr_1fr_1fr] overflow-x-scroll sm:gap-4 gap-2 sm:grid-cols-[1fr_1fr] sm:grid-rows-[1fr_1fr] md:grid-rows-[1fr] grid-rows-[1fr] grid-cols-[1fr_1fr_1fr_1fr] p-1">
          {freshSalesProducts.map((el) => {
            return <FreshSalesCard product={el} key={el._id} />;
          })}
        </div>
      </div>

      {/* ////Second sub section : trending must have */}

      <div>
        <HomeHeadlines headline="trending must have" />
        <div className="grid flashSalesSection md:grid-cols-[1fr_1fr_1fr] overflow-y-hidden overflow-x-scroll sm:gap-4 gap-3 sm:grid-cols-[1fr] sm:grid-rows-[1fr_1fr_1fr] md:grid-rows-[1fr] grid-rows-[1fr] grid-cols-[auto_auto_auto] p-1">
          {trending.slice(0, 3).map((el) => {
            return <TrendingMustHaveCard product={el} key={el._id} />;
          })}
        </div>
      </div>

      {/* ////Third sub section : top 100 */}

      <div>
        <HomeHeadlines headline="top 100" />
        <div>
          <div className="grid flashSalesSection md:grid-cols-[1fr_1fr_1fr_1fr] overflow-x-scroll sm:gap-4 gap-2 sm:grid-cols-[1fr_1fr] sm:grid-rows-[1fr_1fr] md:grid-rows-[1fr] grid-rows-[1fr] grid-cols-[1fr_1fr_1fr_1fr] p-1">
            {top100.map((el: any) => {
              return <MainProductsCard product={el} key={el._id} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SecondMainSection;
