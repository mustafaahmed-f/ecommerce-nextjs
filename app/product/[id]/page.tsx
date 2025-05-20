import { getSingleProduct } from "@/app/_lib/APIs/productsAPIs";
import BreadCrumb from "@/app/products/_components/BreadCrumb";
import Image from "next/image";
import ProductInfo from "./_components/ProductInfo";
import ProductTabs from "./_components/ProductTabs";

interface PageProps {
  params: Promise<any>;
}

async function Page(props: PageProps) {
  const params = await props.params;
  const product = await getSingleProduct(parseInt(params.id));
  const { productId, title, image, category } = product.product;
  const breadCrumbOptions = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: category as string,
      href: `/products/${category}`,
    },
    {
      label: title as string,
      href: `/product/${productId}`,
      current: true,
    },
  ];
  return (
    <section className="flex w-full flex-col">
      <div className="categoryList flex w-full list-none items-center justify-start bg-slate-100 px-2 py-5 sm:gap-3 sm:px-8 md:mx-0 md:gap-16 md:px-20">
        <BreadCrumb breadCrumbOptions={breadCrumbOptions} />
      </div>
      <div className="relative flex flex-col px-5 py-6 sm:px-14 sm:py-10 md:px-20">
        {/* Out of stock ribbon */}
        {product.stock === 0 ? (
          <div className="absolute left-0 top-10 z-10 w-[110px] -rotate-45 transform bg-red-600 py-1 text-center text-sm font-semibold text-white shadow-md">
            Out of Stock
          </div>
        ) : null}
        {/* First section ( image and product info ) */}
        <div className="grid min-h-96 grid-cols-1 gap-2 sm:grid-cols-2">
          <div className="flex h-full items-center justify-center border-e-0 sm:border-e sm:border-slate-300">
            <Image src={image} alt={title} width={500} height={500} />
          </div>
          <div className="my-auto w-full sm:ps-7 md:ps-9">
            <ProductInfo product={product.product} />
          </div>
        </div>
      </div>
      <ProductTabs product={product.product} />
    </section>
  );
}

export default Page;
