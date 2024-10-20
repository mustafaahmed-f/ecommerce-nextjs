import { useState } from "react";
import Footer from "../Footer/Footer";

function Menu({ setShowMenu }: { setShowMenu: any }) {
  const [category, setCategory] = useState(null);

  function handleSetCategory(categoryValue: any) {
    if (categoryValue === category) {
      setCategory(null);
      return;
    }
    setCategory(categoryValue);
  }

  return (
    <div className="absolute top-0 w-full h-full sm:hidden">
      <div className=" grid grid-rows-[auto_1fr_auto]">
        <div className="flex items-center w-full px-2 py-4 bg-white">
          <span
            className="p-1 cursor-pointer w-fit"
            onClick={() => setShowMenu(false)}
          >
            x
          </span>
          <p className="flex-grow font-bold text-center">Menu</p>
        </div>

        <div className="px-2 py-3 bg-bgGrey">
          <ul className="flex flex-col gap-4 list-none">
            <li>
              <p
                onClick={() => handleSetCategory("electronics")}
                className={`mb-1 font-semibold cursor-pointer hover:text-orange-300 ${
                  category === "electronics" && "text-orange-300"
                }`}
              >
                electronics
              </p>
              {category === "electronics" && (
                <div className="px-1 py-2 mb-1 bg-white fade-in">
                  <ul className="flex flex-col w-full gap-1 text-center">
                    <li>phones & tablets</li>
                    <li>computers & laptops</li>
                    <li>cameras & photography</li>
                  </ul>
                </div>
              )}
            </li>
            <li>
              <p
                onClick={() => handleSetCategory("clothing")}
                className={`mb-1 font-semibold cursor-pointer hover:text-orange-300 ${
                  category === "clothing" && "text-orange-300"
                }`}
              >
                clothing
              </p>
              {category === "clothing" && (
                <div className="px-1 py-2 mb-1 bg-white fade-in">
                  <ul className="flex flex-col w-full gap-1 text-center">
                    <li>phones & tablets</li>
                    <li>computers & laptops</li>
                    <li>cameras & photography</li>
                  </ul>
                </div>
              )}
            </li>
            <li>
              <p
                onClick={() => handleSetCategory("home and kitchen")}
                className={`mb-1 font-semibold cursor-pointer hover:text-orange-300 ${
                  category === "home and kitchen" && "text-orange-300"
                }`}
              >
                home and kitchen
              </p>
              {category === "home and kitchen" && (
                <div className="px-1 py-2 mb-1 bg-white fade-in">
                  <ul className="flex flex-col w-full gap-1 text-center">
                    <li>phones & tablets</li>
                    <li>computers & laptops</li>
                    <li>cameras & photography</li>
                  </ul>
                </div>
              )}
            </li>
            <li>
              <p
                onClick={() => handleSetCategory("beauty and personal care")}
                className={`mb-1 font-semibold cursor-pointer hover:text-orange-300 ${
                  category === "beauty and personal care" && "text-orange-300"
                }`}
              >
                beauty and personal care
              </p>

              {category === "beauty and personal care" && (
                <div className="px-1 py-2 mb-1 bg-white fade-in">
                  <ul className="flex flex-col w-full gap-1 text-center">
                    <li>phones & tablets</li>
                    <li>computers & laptops</li>
                    <li>cameras & photography</li>
                  </ul>
                </div>
              )}
            </li>
            <li>
              <p
                onClick={() => handleSetCategory("sports and outdoors")}
                className={`mb-1 font-semibold cursor-pointer hover:text-orange-300 ${
                  category === "sports and outdoors" && "text-orange-300"
                }`}
              >
                sports and outdoors
              </p>
              {category === "sports and outdoors" && (
                <div className="px-1 py-2 mb-1 bg-white fade-in">
                  <ul className="flex flex-col w-full gap-1 text-center">
                    <li>phones & tablets</li>
                    <li>computers & laptops</li>
                    <li>cameras & photography</li>
                  </ul>
                </div>
              )}
            </li>
            <li>
              <p
                onClick={() => handleSetCategory("books and stationery")}
                className={`mb-1 font-semibold cursor-pointer hover:text-orange-300 ${
                  category === "books and stationery" && "text-orange-300"
                }`}
              >
                books and stationery
              </p>
              {category === "books and stationery" && (
                <div className="px-1 py-2 mb-1 bg-white fade-in">
                  <ul className="flex flex-col w-full gap-1 text-center">
                    <li>phones & tablets</li>
                    <li>computers & laptops</li>
                    <li>cameras & photography</li>
                  </ul>
                </div>
              )}
            </li>
            <li>
              <p
                onClick={() => handleSetCategory("health & wellness")}
                className={`mb-1 font-semibold cursor-pointer hover:text-orange-300 ${
                  category === "health & wellness" && "text-orange-300"
                }`}
              >
                health & wellness
              </p>
              {category === "health & wellness" && (
                <div className="px-1 py-2 mb-1 bg-white fade-in">
                  <ul className="flex flex-col w-full gap-1 text-center">
                    <li>phones & tablets</li>
                    <li>computers & laptops</li>
                    <li>cameras & photography</li>
                  </ul>
                </div>
              )}
            </li>
          </ul>
        </div>

        <div className="px-2 pt-4 pb-3 bg-white">
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
      <Footer />
    </div>
  );
}

export default Menu;
