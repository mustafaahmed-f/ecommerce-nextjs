import { getSingleProduct } from "@/app/_lib/APIs/productsAPIs";

interface PageProps {
  params: {
    id: string;
  };
}

async function Page({ params }: PageProps) {
  const product = await getSingleProduct(parseInt(params.id));

  return <div></div>;
}

export default Page;
