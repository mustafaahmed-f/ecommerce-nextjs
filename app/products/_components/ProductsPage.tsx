import { Suspense } from "react";
import FilterBtn from "./FilterBtn";
import SortBtn from "./SortBtn";
import Spinner from "@/app/_components/Spinner";
import ProductsList from "./ProductsList";
import ProductsPagination from "./ProductsPagination";

interface ProductsPageProps {
  products: { success: boolean; products: any[]; totalProducts: number };
}

function ProductsPage({ products }: ProductsPageProps) {
  return (
    <>
      <div className="flex items-center max-sm:justify-center max-sm:gap-9 w-full sm:justify-end mb-5">
        <SortBtn />
        <FilterBtn />
      </div>
      <Suspense fallback={<Spinner />}>
        <ProductsList products={products.products} />
      </Suspense>
      <ProductsPagination productsCount={products.totalProducts} />
    </>
  );
}

export default ProductsPage;
