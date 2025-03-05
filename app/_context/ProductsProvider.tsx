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

interface ProductsProviderProps {
  children: ReactNode;
  intitialCategories: any;
  initialProducts: any[];
}

interface initialStateType {
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  initialProducts: any[];
  // products: any[];
  // setProducts: React.Dispatch<React.SetStateAction<any[]>>;
  trie: Trie;
  searchVal: string;
  setSearchVal: React.Dispatch<React.SetStateAction<string>>;
  showAutoComplete: boolean;
  setShowAutoComplete: React.Dispatch<React.SetStateAction<boolean>>;
  loadingProducts: boolean;
  errorProducts: string;
}

const initialState: initialStateType = {
  category: "All",
  setCategory: () => {},
  // products: [],
  initialProducts: [],
  // setProducts: () => {},
  trie: new Trie(),
  searchVal: "",
  setSearchVal: () => {},
  showAutoComplete: false,
  setShowAutoComplete: () => {},
  loadingProducts: true,
  errorProducts: "",
};

const categoriesContext = createContext<initialStateType>(initialState);

function ProductsProvider({
  children,
  intitialCategories,
  initialProducts,
}: ProductsProviderProps) {
  type Category = (typeof intitialCategories)[number];
  const { 0: category, 1: setCategory } = useState<Category>("mobile");
  // const { 0: products, 1: setProducts } = useState<any[]>([]);
  const { 0: loadingProducts, 1: setLoadingProducts } = useState<boolean>(true);
  const { 0: errorProducts, 1: setErrorProducts } = useState<string>("");
  const { 0: searchVal, 1: setSearchVal } = useState<string>("");
  const { 0: showAutoComplete, 1: setShowAutoComplete } =
    useState<boolean>(false);
  const { 0: trie, 1: setTrie } = useState<Trie>(new Trie());
  const trieMap = useRef(new Map<Category, Trie>());

  const { data, isPending, error, isError } = useQuery({
    queryKey: ["products by category", category],
    enabled: !!category && category !== "All",
    queryFn: async () => {
      console.log("Query fn called !!");
      const response = await getAllProducts({ category });
      if (response.success) return response.products;
      return [];
    },
  });

  console.log("Data : ", data);

  //// set products with each change in category
  useEffect(() => {
    console.log("UseEffect called !!");
    if (category === "All") {
      // setProducts(initialProducts ?? []);
      if (!trieMap.current.has("All")) {
        let newTrie = new Trie();
        trieMap.current.set("All", newTrie);
        for (let product of initialProducts) {
          newTrie.addProduct(product.title, product.productId);
        }
      }
      setTrie(trieMap.current.get("All")!);
    } else if (category !== "All" && data && !isPending && !isError) {
      // setProducts(data ?? []);
      if (!trieMap.current.has(category)) {
        let newTrie = new Trie();
        trieMap.current.set(category, newTrie);
        for (let product of data as any[]) {
          newTrie.addProduct(product.title, product.productId);
        }
      }
      setTrie(trieMap.current.get(category)!);
    }
  }, [
    category,
    data,
    isPending,
    isError,
    // setProducts,
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
        // products: isPending ? [] : products,
        // setProducts,
        trie,
        searchVal,
        setSearchVal,
        showAutoComplete,
        setShowAutoComplete,
        initialProducts,
        loadingProducts,
        errorProducts,
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
