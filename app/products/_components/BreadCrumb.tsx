import * as React from "react";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/app/_components/shadcn/breadcrumb";

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
    <Breadcrumb>
      <BreadcrumbList>
        {breadCrumbOptions.map((option, index) => (
          <React.Fragment key={index}>
            <BreadcrumbItem>
              {option.current ? (
                <BreadcrumbPage>{option.label}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <Link href={option.href}>{option.label}</Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {index < breadCrumbOptions.length - 1 && <BreadcrumbSeparator />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default BreadCrumb;
