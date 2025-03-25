import { getSingleProduct } from "@/app/_lib/APIs/productsAPIs";

interface PageProps {
  params: any;
}

// export async function generateStaticParams() {
//   const products = await getAllProducts();

//   return products.products.map((product: any) => ({
//     params: { id: product.id },
//   }));
// }

async function Page({ params }: PageProps) {
  const product = await getSingleProduct(params.id);
  console.log(product);
  return <div>{params.id}</div>;
}

export default Page;
