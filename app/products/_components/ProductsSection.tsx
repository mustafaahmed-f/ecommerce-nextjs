import React from "react";

interface ProductsSectionProps {}

function ProductsSection({}: ProductsSectionProps) {
  return (
    <div className="grid max-sm:grid-cols-2 sm:grid-cols-1 md:grid-cols-3 max-sm:gap-2 sm:gap-4"></div>
  );
}

export default ProductsSection;
