import { getBrandsFromDB } from "../_lib/APIs/modelsAndBrandsAPIs";
import BreadCrumbWrapper from "./_components/BreadCrumbWrapper";
import FilterSideBar from "./_components/FilterSideBar";
interface layoutProps {
  children: React.ReactNode;
}

async function layout({ children }: layoutProps) {
  const brands: any = await getBrandsFromDB();

  return (
    <div className="grid grid-cols-1 grid-rows-[1fr_auto]">
      <BreadCrumbWrapper />
      <div className="grid grid-cols-[1fr] gap-6 sm:grid-cols-[1fr_4fr]">
        <FilterSideBar brands={brands} />
        <div className="w-full p-3 sm:p-4">{children}</div>
      </div>
    </div>
  );
}

export default layout;
