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
      <div className="mb-5 flex w-full items-center max-sm:justify-center max-sm:gap-9 sm:justify-end">
        {products.products.length ? (
          <>
            <SortBtn />
            <FilterBtn />
          </>
        ) : null}
      </div>
      <Suspense fallback={<Spinner />}>
        <ProductsList products={products.products} />
      </Suspense>
      {products.products.length ? (
        <ProductsPagination productsCount={products.totalProducts} />
      ) : null}
    </>
  );
}

export default ProductsPage;
