import MainProductsCard from "@/app/_components/MainPageComponents/MainProductsCard";

interface ProductsListProps {
  products: any[];
}

function ProductsList({ products }: ProductsListProps) {
  return (
    <div className="grid max-sm:grid-cols-2 sm:grid-cols-1 md:grid-cols-3 max-sm:gap-2 sm:gap-4">
      {products.length ? (
        products.map((product) => (
          <MainProductsCard product={product} key={product._id} />
        ))
      ) : (
        <div className="w-full col-span-full my-7">
          <p className="text-center text-red-500 font-semibold">
            No products found
          </p>
        </div>
      )}
    </div>
  );
}

export default ProductsList;
