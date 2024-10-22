import React from "react";
import HomeHeadlines from "./HomeHeadlines";
import FreshSalesCard from "./FreshSalesCard";
import TrendingMustHaveCard from "./TrendingMustHaveCard";
import MainProductsCard from "./MainProductsCard";

interface SecondMainSectionProps {
  products: any;
}

function SecondMainSection({ products }: SecondMainSectionProps) {
  const cardNums = [1, 2, 3, 4];
  const freshSalesProducts: any[] = products.products.slice(
    products.products.length - 4
  );

  return (
    <div className="flex flex-col gap-16 px-5 sm:px-16 sm:pt-16 ">
      {/* ////First sub section : fresh sales */}

      <div>
        <HomeHeadlines headline="fresh sales" />
        <div className="grid flashSalesSection md:grid-cols-[1fr_1fr_1fr_1fr] overflow-x-scroll sm:gap-4 gap-2 sm:grid-cols-[1fr_1fr] sm:grid-rows-[1fr_1fr] md:grid-rows-[1fr] grid-rows-[1fr] grid-cols-[1fr_1fr_1fr_1fr] p-1">
          {freshSalesProducts.map((el) => {
            return <FreshSalesCard product={el} key={el.id} />;
          })}
        </div>
      </div>

      {/* ////Second sub section : trending must have */}

      <div>
        <HomeHeadlines headline="trending must have" />
        <div className="grid flashSalesSection md:grid-cols-[1fr_1fr_1fr] overflow-x-scroll sm:gap-4 gap-3 sm:grid-cols-[1fr] sm:grid-rows-[1fr_1fr_1fr] md:grid-rows-[1fr] grid-rows-[1fr] grid-cols-[auto_auto_auto] p-1">
          {cardNums.slice(0, 3).map((el) => {
            return <TrendingMustHaveCard cardNum={el} key={el} />;
          })}
        </div>
      </div>

      {/* ////Third sub section : top 100 */}

      <div>
        <HomeHeadlines headline="top 100" />
        <div>
          <div className="grid flashSalesSection md:grid-cols-[1fr_1fr_1fr_1fr] overflow-x-scroll sm:gap-4 gap-2 sm:grid-cols-[1fr_1fr] sm:grid-rows-[1fr_1fr] md:grid-rows-[1fr] grid-rows-[1fr] grid-cols-[1fr_1fr_1fr_1fr] p-1">
            {cardNums.map((el) => {
              return <MainProductsCard key={el} />;
            })}
          </div>
        </div>
      </div>

      {/* ////Fourth sub section ( Desktop and tablets only )*/}
    </div>
  );
}

export default SecondMainSection;
