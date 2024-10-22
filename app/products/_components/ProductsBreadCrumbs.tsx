import { Breadcrumbs, Link, Typography } from "@mui/material";
import React from "react";

interface ProductsBreadCrumbsProps {
  category: string | null;
}

function ProductsBreadCrumbs({ category }: ProductsBreadCrumbsProps) {
  return (
    <div className="py-6 px-12 bg-white text-start">
      <div role="presentation">
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="/">
            Homepage
          </Link>
          <Typography sx={{ color: "text.primary" }}>
            {category ?? "All products"}
          </Typography>
        </Breadcrumbs>
      </div>
    </div>
  );
}

export default ProductsBreadCrumbs;
