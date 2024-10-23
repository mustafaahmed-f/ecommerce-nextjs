import { useCategories } from "@/app/_context/CategoriesProvider";
import { KeyboardArrowDownOutlined, SearchOutlined } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import Link from "next/link";
import { redirect, usePathname, useRouter } from "next/navigation";
import AutoCompleteDialog from "./AutoCompleteDialog";
import { useEffect, useRef } from "react";

function ProductSearchDiv() {
  const {
    searchVal,
    setSearchVal,
    trie,
    setShowAutoComplete,
    showAutoComplete,
  } = useCategories();

  const inputRef = useRef<HTMLInputElement>(null);
  const pathName = usePathname();
  const route = useRouter();
  let productsArr = trie.search(searchVal);

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
    <div className="productSearchDiv flex relative items-center gap-[2px] sm:gap-1 py-1 sm:text-base text-sm bg-white rounded-sm w-full sm:w-fit flex-nowrap ring-1 ring-neutral-400">
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

      <div className="flex h-full bg-white cursor-pointer whitespace-nowrap flex-nowrap">
        {searchVal && (
          <div
            onClick={() => {
              setSearchVal("");
              setShowAutoComplete(false);
            }}
            className="cursor-pointer hover:text-primary-500  text-lg flex items-center  pe-2"
          >
            <CloseIcon fontSize="small" />
          </div>
        )}
        All categories
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
