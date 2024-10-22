import { useCategories } from "@/app/_context/CategoriesProvider";
import { getCategories } from "@/app/_lib/APIs/categoriesAPIs";

async function CategoriesOptions() {
  const categories = await getCategories();
  return (
    <div className="">
      <ul className="flex items-center justify-center  list-none py-5  sm:gap-3 md:gap-16 sm:px-2 md:px-24 categoryList">
        {categories.categories.map((el: string, i: number) => (
          <li key={i} className="text-center cursor-pointer hover:text-sky-600">
            {el}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CategoriesOptions;
