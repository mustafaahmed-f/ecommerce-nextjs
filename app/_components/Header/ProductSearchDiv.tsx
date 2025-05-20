import { useCategories } from "@/app/_context/CategoriesProvider";
import { useNextNavigation } from "@/app/_context/NextNavigationProvider";
import { useProducts } from "@/app/_context/ProductsProvider";
import CloseSVG from "@/app/_icons/CloseSVG";
import KeyboardArrowDownSVG from "@/app/_icons/KeyboardArrowDownSVG";
import SearchSVG from "@/app/_icons/SearchSVG";
import Link from "next/link";
import { useEffect, useRef } from "react";
import AutoCompleteDialog from "./AutoCompleteDialog";
import styles from "./ProductSearchDiv.module.scss";

function ProductSearchDiv() {
  const {
    searchVal,
    setSearchVal,
    trie,
    setShowAutoComplete,
    showAutoComplete,
    loadingProducts,
    category,
    setCategory,
  } = useProducts();
  const { categories } = useCategories();

  const inputRef = useRef<HTMLInputElement>(null);
  const { pathName, router: route } = useNextNavigation();
  let productsArr = trie.search(searchVal);

  function setCategoryHandler(category: string) {
    setCategory(category);
    setShowAutoComplete(false);
  }

  useEffect(() => {
    setShowAutoComplete(false);
  }, [pathName, setShowAutoComplete]);

  useEffect(() => {
    const inputElement = inputRef.current;
    function handleSearch(e: KeyboardEvent) {
      if (!productsArr.length) return;
      if (e.key === "Enter" && searchVal && productsArr.length > 0) {
        route.push(`/product/${String(productsArr[0]?.prodId)}`);
      }
    }

    inputElement?.addEventListener("keydown", handleSearch);

    return () => inputElement?.removeEventListener("keydown", handleSearch);
  }, [productsArr, searchVal, route]);

  useEffect(() => {
    function handleCloseAutoComplete(e: any) {
      if (!e.target.closest(".productSearchDiv")) {
        setShowAutoComplete(false);
      }
    }

    document.addEventListener("click", handleCloseAutoComplete);
  }, [setShowAutoComplete]);

  return (
    <div
      className={`productSearchDiv relative flex w-full flex-nowrap items-center gap-[2px] rounded-sm bg-white py-1 text-sm ring-1 ring-neutral-400 sm:w-fit sm:gap-1 sm:text-base ${
        loadingProducts ? "pointer-events-none opacity-40" : ""
      }`}
    >
      <input
        value={searchVal}
        ref={inputRef}
        onChange={(e) => {
          setSearchVal(e.target.value);
          setShowAutoComplete(e.target.value ? true : false);
        }}
        onFocus={() => {
          setShowAutoComplete(true);
        }}
        placeholder="Search products"
        className="flex-grow px-2 py-1 focus:outline-0 sm:px-3"
        suppressHydrationWarning
      />
      {searchVal && showAutoComplete && (
        <AutoCompleteDialog productsArr={productsArr} />
      )}

      <div
        className={`${styles.dropdown} flex h-full cursor-pointer flex-nowrap whitespace-nowrap bg-white`}
        onClick={() => setShowAutoComplete(false)}
      >
        {searchVal && (
          <div
            onClick={() => {
              setSearchVal("");
            }}
            className="flex cursor-pointer items-center pe-2 text-lg hover:text-primary-500"
          >
            <CloseSVG />
          </div>
        )}
        <div className="flex items-center">
          <p className="flex items-center text-center">
            {category === "All" ? "All categories" : category}
          </p>
        </div>
        <div className={`${styles.list} border-2 bg-slate-50`}>
          <p
            onClick={() => setCategoryHandler("All")}
            className={`${
              category === "All" ? "bg-neutral-200" : ""
            } hover:bg-neutral-300`}
          >
            All categories
          </p>
          {categories.categories.map((categoryEl: string) => (
            <p
              key={categoryEl}
              onClick={() => {
                setCategoryHandler(categoryEl);
              }}
              className={`${
                category === categoryEl ? "bg-neutral-200" : ""
              } hover:bg-neutral-300`}
            >
              {categoryEl}
            </p>
          ))}
        </div>
        <span>
          <KeyboardArrowDownSVG />
        </span>
      </div>
      <Link
        href={`/product/${String(productsArr[0]?.prodId)}`}
        onClick={(e) => {
          if (!productsArr.length) e.preventDefault();
        }}
        className="h-full cursor-pointer border-s-2 bg-white px-1"
      >
        <SearchSVG />
      </Link>
    </div>
  );
}

export default ProductSearchDiv;
