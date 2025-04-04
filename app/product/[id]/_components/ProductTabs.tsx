"use client";
import { Tab } from "@mui/material";
import { ProductType, Review } from "../_types/Product.type";
import Box from "@mui/material/Box";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useState } from "react";
import ProductReviewsSection from "./ProductReviewsSection";

interface ProductTabsProps {
  product: ProductType;
}

function ProductTabs({ product }: ProductTabsProps) {
  const { description, reviews } = product;
  const [value, setValue] = useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <div className="px-2 py-8 sm:px-8 md:px-20">
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Description" value="1" />
              <Tab label="Reviews" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <p>{description}</p>
          </TabPanel>
          <TabPanel value="2">
            <ProductReviewsSection reviews={reviews as Review[]} />
          </TabPanel>
        </TabContext>
      </Box>
    </div>
  );
}

export default ProductTabs;
