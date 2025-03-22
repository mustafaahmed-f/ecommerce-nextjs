import * as React from "react";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "next/link";

export interface breadCrumbOptionsType {
  label: string;
  href: string;
  current?: boolean;
}

interface BreadCrumbProps {
  breadCrumbOptions: breadCrumbOptionsType[];
}

function BreadCrumb({ breadCrumbOptions }: BreadCrumbProps) {
  return (
    <div role="presentation">
      <Breadcrumbs aria-label="breadcrumb">
        {breadCrumbOptions.map((option, i) =>
          !option.current ? (
            <Link
              color="inherit"
              href={option.href}
              key={i}
              className="hover:underline"
            >
              {option.label}
            </Link>
          ) : (
            <Typography key={i} sx={{ color: "text.primary" }}>
              {option.label}
            </Typography>
          )
        )}
      </Breadcrumbs>
    </div>
  );
}

export default BreadCrumb;
