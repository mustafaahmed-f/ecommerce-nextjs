"use client";

import { ProductType } from "../_types/Product.type";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/_components/shadcn/tabs";
import { useState } from "react";
import ProductReviewsSection from "./ProductReviewsSection";

interface ProductTabsProps {
  product: ProductType;
}

function ProductTabs({ product }: ProductTabsProps) {
  const { description, reviews } = product;
  const [value, setValue] = useState("1");

  const handleChange = (value: string) => {
    setValue(value);
  };

  return (
    <div className="px-2 py-8 sm:px-8 md:px-20">
      <Tabs value={value} onValueChange={handleChange} className="w-full">
        <TabsList className="border-b border-gray-200">
          <TabsTrigger value="1">Description</TabsTrigger>
          <TabsTrigger value="2">Reviews</TabsTrigger>
        </TabsList>
        <TabsContent value="1">
          <p>{description}</p>
        </TabsContent>
        <TabsContent value="2">
          <ProductReviewsSection reviews={reviews!} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default ProductTabs;
