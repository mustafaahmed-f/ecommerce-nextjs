import { getAllProducts } from "@/app/_lib/APIs/productsAPIs";
import Spinner from "../Spinner";
import FreshSalesCard from "./FreshSalesCard";
import HomeHeadlines from "./HomeHeadlines";
import HorizontalScrollWrapper from "./HorizontalScrollWrapper";
import MainProductsCard from "./MainProductsCard";
import TrendingMustHaveCard from "./TrendingMustHaveCard";

async function SecondMainSection({}) {
  const fetchedProducts = await getAllProducts();
  const products = fetchedProducts.products || [];
  const freshSalesProducts: any[] = products.length ? products.slice(0, 4) : [];
  const trending: any[] = products.length ? products.slice(40, 43) : [];
  const top100: any[] = products.length ? products.slice(20, 24) : [];

  if (!products.length) return <Spinner />;

  return (
    <div className="flex flex-col gap-16 px-5 sm:px-16 sm:pt-16">
      {/* ////First sub section : fresh sales */}

      <div>
        <HomeHeadlines headline="fresh sales" />
        <div className="flashSalesSection grid grid-cols-[1fr_1fr_1fr_1fr] grid-rows-[1fr] gap-2 overflow-x-scroll p-1 sm:grid-cols-[1fr_1fr] sm:grid-rows-[1fr_1fr] sm:gap-4 md:grid-cols-[1fr_1fr_1fr_1fr] md:grid-rows-[1fr]">
          {freshSalesProducts.map((el) => {
            return <FreshSalesCard product={el} key={el._id} />;
          })}
        </div>
      </div>

      {/* ////Second sub section : trending must have */}

      <div>
        <HomeHeadlines headline="trending must have" />
        <div className="flashSalesSection grid grid-cols-[auto_auto_auto] grid-rows-[1fr] gap-3 overflow-y-hidden overflow-x-scroll p-1 sm:grid-cols-[1fr] sm:grid-rows-[1fr_1fr_1fr] sm:gap-4 md:grid-cols-[1fr_1fr_1fr] md:grid-rows-[1fr]">
          {trending.slice(0, 3).map((el) => {
            return <TrendingMustHaveCard product={el} key={el._id} />;
          })}
        </div>
      </div>

      {/* ////Third sub section : top 100 */}

      <div>
        <HomeHeadlines headline="top 100" />
        <HorizontalScrollWrapper>
          {top100.map((el: any) => {
            return <MainProductsCard product={el} key={el._id} />;
          })}
        </HorizontalScrollWrapper>
      </div>
    </div>
  );
}

export default SecondMainSection;
