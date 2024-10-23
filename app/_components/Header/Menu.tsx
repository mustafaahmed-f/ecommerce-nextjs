import { useCategories } from "@/app/_context/CategoriesProvider";
import { getCategories } from "@/app/_lib/APIs/categoriesAPIs";
import Link from "next/link";

function Menu({ setShowMenu }: { setShowMenu: any }) {
  const categories = useCategories();
  console.log(categories);
  return (
    <div className="absolute top-0 z-50 w-full h-full sm:hidden ">
      <div className=" grid grid-rows-[auto_1fr_auto] bg-bgGrey ">
        <div className="flex items-center w-full px-2 py-4 bg-white">
          <span
            className="p-1 cursor-pointer w-fit"
            onClick={() => setShowMenu(false)}
          >
            x
          </span>
          <p className="flex-grow font-bold text-center">Menu</p>
        </div>

        <div className="px-2 py-3 border-y-2 border-b-white border-slate-400">
          <ul className="flex flex-col gap-4 list-none">
            {categories?.categories?.map((el: string, i: number) => (
              <Link href={`products/${el}`} key={i}>
                <p
                  className={`mb-1 font-semibold cursor-pointer hover:text-orange-300`}
                >
                  {el}
                </p>
              </Link>
            ))}
          </ul>
        </div>

        <div className="px-2 pt-4 pb-3 border-slate-400 border-b-2">
          <ul className="flex flex-col items-center gap-4 pt-2 pb-1 font-semibold">
            <li className="flex items-center justify-between w-full cursor-pointer hover:text-sky-400">
              <p>Login/Register</p>
              <span>{">"}</span>
            </li>
            <li className="flex items-center justify-between w-full cursor-pointer hover:text-sky-400">
              <p>Help & Support</p>
              <span>{">"}</span>
            </li>
            <li className="flex items-center justify-between w-full cursor-pointer hover:text-sky-400">
              <p>About us</p>
              <span>{">"}</span>
            </li>
            <li className="flex items-center justify-between w-full cursor-pointer hover:text-sky-400">
              <p>Blog</p>
              <span>{">"}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Menu;
