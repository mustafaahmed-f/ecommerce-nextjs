import { getAllProducts } from "../_lib/APIs/productsAPIs";
import ProductsPage from "./_components/ProductsPage";

interface PageProps {
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

async function Page(props: PageProps) {
  const searchParams = await props.searchParams;
  const page = searchParams.page ?? "1";
  const size = searchParams.size ?? "15";
  const sort = searchParams.sort ?? "";
  const brand = searchParams.brand ?? "";
  const color = searchParams.color ?? "";
  const priceMin = searchParams.priceMin ?? "0";
  const priceMax = searchParams.priceMax ?? "50000";

  const products = await getAllProducts({
    page: parseInt(page),
    size: parseInt(size),
    sort,
    brand,
    color,
    priceMin: parseInt(priceMin),
    priceMax: parseInt(priceMax),
  });
  console.log(
    `🚀 ~ file: page.tsx:25 ~ Page : ${page} & size : ${size} ~ products:`,
    products.totalProducts,
  );
  if (!products.success)
    return (
      <div className="flex h-full w-full items-center justify-center text-center">
        <h1>{products.error}</h1>
      </div>
    );
  return <ProductsPage products={products} />;
}

export default Page;
