"use client";

import { useProducts } from "@/app/_context/ProductsProvider";
import Spinner from "../Spinner";
import FreshSalesCard from "./FreshSalesCard";
import HomeHeadlines from "./HomeHeadlines";
import MainProductsCard from "./MainProductsCard";
import TrendingMustHaveCard from "./TrendingMustHaveCard";

function SecondMainSection({}) {
  const { products } = useProducts();

  const freshSalesProducts: any[] = products.length ? products.slice(0, 4) : [];
  const trending: any[] = products.length ? products.slice(40, 43) : [];
  const top100: any[] = products.length ? products.slice(20, 24) : [];

  if (!products.length) return <Spinner />;

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
