import BreadCrumb from "@/app/_components/BreadCrumb";
import { getCategories } from "@/app/_lib/APIs/categoriesAPIs";
import { getAllProducts } from "@/app/_lib/APIs/productsAPIs";

interface pageProps {
  params: any;
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

async function page({ params }: pageProps) {
  const { category } = params;
  const products = await getAllProducts({ category });

  const breadCrumbOptions = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: category,
      href: `/products/${category}`,
      current: true,
    },
  ];

  // console.log(`PRoducts of category ${category} : `, products);

  return (
    <>
      {/* Breadcrumb section */}

      <div className="flex items-center justify-start bg-slate-100 w-full md:mx-0 px-2 list-none py-5  sm:gap-3 md:gap-16  sm:px-8 md:px-20 categoryList">
        <BreadCrumb breadCrumbOptions={breadCrumbOptions} />
      </div>
    </>
  );
}

export default page;
