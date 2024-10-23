import Link from "next/link";
import React from "react";

interface ProductSearchResultProps {
  prodName: string;
  prodId: number;
  index: number;
}

function ProductSearchResult({
  prodName,
  prodId,
  index,
}: ProductSearchResultProps) {
  return (
    <Link
      href={`/product/${String(prodId)}`}
      className={`py-3 px-4 ${
        index % 2 === 0 ? "bg-white" : "bg-neutral-200"
      } hover:bg-neutral-300`}
    >
      {prodName}
    </Link>
  );
}

export default ProductSearchResult;
