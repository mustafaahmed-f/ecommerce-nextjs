import { getSingleProduct } from "@/app/_lib/APIs/productsAPIs";
import BreadCrumb from "@/app/products/_components/BreadCrumb";
import Image from "next/image";
import ProductInfo from "./_components/ProductInfo";

interface PageProps {
  params: any;
}

async function Page({ params }: PageProps) {
  const product = await getSingleProduct(parseInt(params.id));
  const {
    productId,
    title,
    image,
    price,
    description,
    color,
    size,
    ram,
    category,
    discount,
    stock,
    rating,
    reviews,
  } = product.product;
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
      <div className="flex flex-col px-5 py-6 sm:px-20 sm:py-10">
        {/* First section ( image and product info ) */}
        <div className="grid min-h-96 grid-cols-1 gap-2 sm:grid-cols-2">
          <div className="relative h-full border-e-0 sm:border-e sm:border-slate-300">
            <Image src={image} alt={title} fill className="object-contain" />
          </div>
          <div className="my-auto w-full sm:ps-9">
            <ProductInfo
              title={title}
              price={price}
              color={color}
              size={size}
              ram={ram}
              discount={discount}
            />
          </div>
        </div>
        {/* Second seciton ( description and reviews ) */}
        <div></div>
      </div>
    </section>
  );
}

export default Page;
