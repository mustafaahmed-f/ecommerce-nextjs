import { logOutAction } from "@/app/_actions/authActions";
import { useCategories } from "@/app/_context/CategoriesProvider";
import { logOut } from "@/app/_lib/store/slices/userSlice/userSlice";
import { useAppDispatch, useAppSelector } from "@/app/_lib/store/store";
import Link from "next/link";
import { useState } from "react";

function Menu({ setShowMenu }: { setShowMenu: any }) {
  const categories = useCategories();
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const { 0: loading, 1: setLoading } = useState<boolean>(false);

  const logOutFn = async () => {
    if (!user.email || !user.provider) return;
    setLoading(true);
    const response = await logOutAction(user.provider);
    if (
      (user.provider === "google" && response?.success) ||
      (user.provider === "system" && response?.success)
    ) {
      dispatch(logOut());
      window.location.href = "/";
    } else {
      console.log("Error logging out : ", response.error);
    }
    setLoading(false);
  };

  return (
    <div className="absolute top-0 z-50 h-full w-full sm:hidden">
      <div className="grid grid-rows-[auto_1fr_auto] bg-bgGrey">
        <div className="flex w-full items-center bg-white px-2 py-4">
          <span
            className="w-fit cursor-pointer p-1"
            onClick={() => setShowMenu(false)}
          >
            x
          </span>
          <p className="flex-grow text-center font-bold">Menu</p>
        </div>

        <div className="border-y-2 border-slate-400 border-b-white px-2 py-3">
          <ul className="flex list-none flex-col gap-4">
            <Link href={`products}`} key={"All_caategories"}>
              <p
                className={`mb-1 cursor-pointer font-semibold hover:text-orange-300`}
              >
                All Categories
              </p>
            </Link>
            {categories?.categories?.categories?.map(
              (el: string, i: number) => (
                <Link href={`products/${el}`} key={i}>
                  <p
                    className={`mb-1 cursor-pointer font-semibold hover:text-orange-300`}
                  >
                    {el.substring(0, 1).toUpperCase() + el.substring(1)}
                  </p>
                </Link>
              ),
            )}
          </ul>
        </div>

        <div className="border-b-2 border-slate-400 px-2 pb-3 pt-4">
          <ul className="flex flex-col items-center gap-4 pb-1 pt-2 font-semibold">
            {!user.userName && !user.email ? (
              <Link
                href="/login"
                className="flex w-full cursor-pointer items-center justify-between hover:text-sky-400"
              >
                <p>Login/Register</p>
                <span>{">"}</span>
              </Link>
            ) : (
              <Link
                href={`/updateprofile/${user.id}`}
                className="flex w-full cursor-pointer items-center justify-between hover:text-sky-400"
              >
                <p>Update profile</p>
                <span>{">"}</span>
              </Link>
            )}

            <li className="flex w-full cursor-pointer items-center justify-between hover:text-sky-400">
              <p>Help & Support</p>
              <span>{">"}</span>
            </li>
            <li className="flex w-full cursor-pointer items-center justify-between hover:text-sky-400">
              <p>About us</p>
              <span>{">"}</span>
            </li>
            <li className="flex w-full cursor-pointer items-center justify-between hover:text-sky-400">
              <p>Blog</p>
              <span>{">"}</span>
            </li>
            {user.email || user.userName ? (
              <button
                onClick={logOutFn}
                className="flex w-full cursor-pointer items-center justify-between hover:text-sky-400"
              >
                <p>{loading ? "Logging out..." : "Logout"}</p>
                <span>{">"}</span>
              </button>
            ) : null}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Menu;
