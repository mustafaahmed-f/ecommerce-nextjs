import Link from "next/link";
import React from "react";

interface PagesLinksProps {}

function PagesLinks({}: PagesLinksProps) {
  return (
    <div className="flex items-center justify-center gap-9 md:gap-11 whitespace-nowrap">
      <Link href="" className="hover:text-sky-600">
        About us
      </Link>
      <Link href="" className="hover:text-sky-600">
        Blog
      </Link>
      <Link href="" className="hover:text-sky-600">
        Contact us
      </Link>
      <Link href="" className="hover:text-sky-600">
        Help & Support
      </Link>
    </div>
  );
}

export default PagesLinks;
