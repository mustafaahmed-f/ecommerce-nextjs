import styles from "./ProductSearchDiv.module.scss";
import { useProducts } from "@/app/_context/ProductsProvider";
import { KeyboardArrowDownOutlined, SearchOutlined } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import AutoCompleteDialog from "./AutoCompleteDialog";
import { useCategories } from "@/app/_context/CategoriesProvider";

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
  const pathName = usePathname();
  const route = useRouter();
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
      className={`productSearchDiv flex relative items-center gap-[2px] sm:gap-1 py-1 sm:text-base text-sm bg-white rounded-sm w-full sm:w-fit flex-nowrap ring-1 ring-neutral-400 ${
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
        className="flex-grow px-2 py-1 sm:px-3 focus:outline-0"
        suppressHydrationWarning
      />
      {searchVal && showAutoComplete && (
        <AutoCompleteDialog productsArr={productsArr} />
      )}

      <div
        className={`${styles.dropdown} flex h-full bg-white cursor-pointer whitespace-nowrap flex-nowrap`}
        onClick={() => setShowAutoComplete(false)}
      >
        {searchVal && (
          <div
            onClick={() => {
              setSearchVal("");
            }}
            className="cursor-pointer hover:text-primary-500  text-lg flex items-center  pe-2"
          >
            <CloseIcon fontSize="small" />
          </div>
        )}
        <div>
          <p>{category === "All" ? "All categories" : category}</p>
          <div className={`${styles.list} bg-slate-50 border-2`}>
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
        </div>
        <span>
          <KeyboardArrowDownOutlined />
        </span>
      </div>
      <Link
        href={`/product/${String(productsArr[0]?.prodId)}`}
        onClick={(e) => {
          if (!productsArr.length) e.preventDefault();
        }}
        className="h-full px-1 bg-white cursor-pointer border-s-2"
      >
        <SearchOutlined />
      </Link>
    </div>
  );
}

export default ProductSearchDiv;
