"use client";

import ShadcnPagination from "../../_components/ShadcnPagination";

interface ProductsPaginationProps {
  productsCount: number;
  size?: number;
}

function ProductsPagination({ productsCount, size }: ProductsPaginationProps) {
  let count = Math.ceil(productsCount / (size ?? 15));

  return (
    <div className="mb-3 mt-5 flex justify-end">
      <ShadcnPagination count={count} siblingCount={1} showFirstLast={true} />
    </div>
  );
}

export default ProductsPagination;
