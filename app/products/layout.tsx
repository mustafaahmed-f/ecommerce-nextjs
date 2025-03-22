import { getBrands } from "../_lib/APIs/modelsAndBrandsAPIs";
import BreadCrumbWrapper from "./_components/BreadCrumbWrapper";
import FilterSideBar from "./_components/FilterSideBar";
interface layoutProps {
  children: React.ReactNode;
}

async function layout({ children }: layoutProps) {
  const brands: { success: boolean; brands: string[] } = await getBrands();

  return (
    <div className="grid grid-rows-[1fr_auto] grid-cols-1">
      <BreadCrumbWrapper />
      <div className="grid sm:grid-cols-[1fr_4fr] gap-6 grid-cols-[1fr]">
        <FilterSideBar brands={brands.brands} />
        <div className="p-3 sm:p-4 w-full">{children}</div>
      </div>
    </div>
  );
}

export default layout;
