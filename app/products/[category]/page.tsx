import BreadCrumb from "@/app/products/_components/BreadCrumb";
import { getCategories } from "@/app/_lib/APIs/categoriesAPIs";
import { getAllProducts } from "@/app/_lib/APIs/productsAPIs";
import ProductsPage from "../_components/ProductsPage";
import { NextRequest } from "next/server";

interface pageProps {
  params: Promise<any>;
  searchParams: Promise<{
    page?: string;
    size?: string;
    sort?: string;
    brand?: string;
    color?: string;
    priceMin?: string;
    priceMax?: string;
  }>;
}

export const revalidate = 3600 * 24;

export async function generateStaticParams() {
  const categories = await getCategories();
  // console.log("Categories : ", categories);
  return categories.categories.map((category: string) => ({
    params: category,
  }));
}

// export async function generateStaticParams() {
//   const categories = await getCategories();
//   return categories.categories.map((category: any) => ({
//     category: category.title, // ✅ No extra "params" key
//   }));
// }

async function page(props: pageProps) {
  const searchParams = await props.searchParams;
  const params = await props.params;
  const { category } = params;

  const page = searchParams.page ?? "1";
  const size = searchParams.size ?? "15";
  const sort = searchParams.sort ?? "";
  const brand = searchParams.brand ?? "";
  const color = searchParams.color ?? "";
  const priceMin = searchParams.priceMin ?? "0";
  const priceMax = searchParams.priceMax ?? "50000";

  const products = await getAllProducts({
    category,
    page: parseInt(page),
    size: parseInt(size),
    sort,
    brand,
    color,
    priceMin: parseInt(priceMin),
    priceMax: parseInt(priceMax),
  });

  return <ProductsPage products={products} />;
}

export default page;
