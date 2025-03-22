"use client";

import { useNextNavigation } from "@/app/_context/NextNavigationProvider";
import { Pagination } from "@mui/material";

interface ProductsPaginationProps {
  productsCount: number;
}

function ProductsPagination({ productsCount }: ProductsPaginationProps) {
  const { searchParams, pathName, router } = useNextNavigation();
  let count = Math.ceil(productsCount / 15);
  function handlePageChange(e: React.ChangeEvent<unknown>, value: number) {
    let params = new URLSearchParams(searchParams);
    params.set("page", value.toString());
    router.replace(`${pathName}?${params.toString()}`);
  }
  return (
    <div className="mt-5 mb-3 justify-end flex">
      <Pagination
        count={count}
        defaultPage={parseInt(searchParams.get("page") ?? "1")}
        page={parseInt(searchParams.get("page") ?? "1")}
        onChange={handlePageChange}
        siblingCount={1}
        color="primary"
        variant="outlined"
        size="small"
        shape="circular"
        showFirstButton
        showLastButton
      />
    </div>
  );
}

export default ProductsPagination;
