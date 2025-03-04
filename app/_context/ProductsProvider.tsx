"use client";
import { useQuery } from "@tanstack/react-query";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Trie } from "../_lib/DataStructures/Trie";
import { getAllProducts } from "../_lib/APIs/productsAPIs";

//===============================================================================
//========================= used for search =====================================
//===============================================================================

interface ProductsProviderProps {
  children: ReactNode;
  intitialCategories: any;
  initialProducts: any[];
}

interface initialStateType {
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  products: any[];
  setProducts: React.Dispatch<React.SetStateAction<any[]>>;
  trie: Trie;
  searchVal: string;
  setSearchVal: React.Dispatch<React.SetStateAction<string>>;
  showAutoComplete: boolean;
  setShowAutoComplete: React.Dispatch<React.SetStateAction<boolean>>;
}

const initialState = {
  category: "All",
  setCategory: () => {},
  products: [],
  setProducts: () => {},
  trie: new Trie(),
  searchVal: "",
  setSearchVal: () => {},
  showAutoComplete: false,
  setShowAutoComplete: () => {},
};

const categoriesContext = createContext<initialStateType>(initialState);

function ProductsProvider({
  children,
  intitialCategories,
  initialProducts,
}: ProductsProviderProps) {
  type Category = (typeof intitialCategories)[number];
  const { 0: category, 1: setCategory } = useState<Category>("All");
  const { 0: products, 1: setProducts } = useState<any[]>([]);
  const { 0: loadingProducts, 1: setLoadingProducts } =
    useState<boolean>(false);
  const { 0: errorProducts, 1: setErrorProducts } = useState<string>("");
  const { 0: searchVal, 1: setSearchVal } = useState<string>("");
  const { 0: showAutoComplete, 1: setShowAutoComplete } =
    useState<boolean>(false);
  const { 0: trie, 1: setTrie } = useState<Trie>(new Trie());
  const trieMap = useRef(new Map<Category, Trie>());

  const { data, isPending, error, isError } = useQuery({
    queryKey: ["products by category", category],
    enabled: category !== "All",
    queryFn: async () => {
      //todo : add api call to get products by category
      const response = await getAllProducts({
        category,
      });
      if (response.success) return response.products;
    },
  });

  //// set products with each change in category
  useEffect(() => {
    if (category === "All") {
      setProducts(initialProducts ?? []);
      if (!trieMap.current.has("All")) {
        trieMap.current.set("All", new Trie());
        for (let product of initialProducts) {
          trieMap.current
            .get("All")
            ?.addProduct(product.title, product.productId);
        }
      }
      setTrie(trieMap.current.get("All")!);
    } else if (category !== "All" && data?.length && !isPending && !isError) {
      setProducts(data);
      if (!trieMap.current.has(category)) {
        trieMap.current.set(category, new Trie());
        for (let product of data as any[]) {
          trieMap.current
            .get(category)
            ?.addProduct(product.title, product.productId);
        }
      }
      setTrie(trieMap.current.get(category)!);
    }
  }, [
    category,
    data,
    isPending,
    isError,
    setProducts,
    initialProducts,
    trieMap,
    setTrie,
  ]);

  //// Used to set error messages and loading state
  useEffect(() => {
    if (isPending) setLoadingProducts(true);
    else if (!isPending && loadingProducts) setLoadingProducts(false);
    if (isError) setErrorProducts(error.message);
    else if (!isError && errorProducts) setErrorProducts("");
  }, [
    isPending,
    setLoadingProducts,
    error,
    isError,
    setErrorProducts,
    errorProducts,
    loadingProducts,
  ]);

  return (
    <categoriesContext.Provider
      value={{
        category,
        setCategory,
        products,
        setProducts,
        trie,
        searchVal,
        setSearchVal,
        showAutoComplete,
        setShowAutoComplete,
      }}
    >
      {children}
    </categoriesContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(categoriesContext);
  if (!context) {
    throw new Error(
      "Can't use categories context outside categories provider !!"
    );
  }
  return context;
}

export default ProductsProvider;
