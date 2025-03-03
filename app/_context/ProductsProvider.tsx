"use client";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Trie } from "../_lib/DataStructures/Trie";

//===============================================================================
//========================= used for search =====================================
//===============================================================================

interface ProductsProviderProps {
  children: ReactNode;
  intitialCategories: any;
  initialProducts: any[];
}

const categoriesContext = createContext<{
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  products: any[];
  setProducts: React.Dispatch<React.SetStateAction<any[]>>;
  trie: Trie;
  searchVal: string;
  setSearchVal: React.Dispatch<React.SetStateAction<string>>;
  showAutoComplete: boolean;
  setShowAutoComplete: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  category: "All",
  setCategory: () => {},
  products: [],
  setProducts: () => {},
  trie: new Trie(),
  searchVal: "",
  setSearchVal: () => {},
  showAutoComplete: false,
  setShowAutoComplete: () => {},
});

function ProductsProvider({
  children,
  intitialCategories,
  initialProducts,
}: ProductsProviderProps) {
  //Todo : type of category state will be the category string itself not just string
  const { 0: category, 1: setCategory } = useState<string>("All");
  const { 0: products, 1: setProducts } = useState<any[]>([]);
  const { 0: map, 1: setMap } = useState<Map<string, any[]>>(new Map());
  const { 0: searchVal, 1: setSearchVal } = useState<string>("");
  const { 0: showAutoComplete, 1: setShowAutoComplete } =
    useState<boolean>(false);
  let trie = new Trie();
  for (let product of products) {
    trie.addProduct(product.title, product.productId);
  }

  useEffect(() => {
    setProducts(initialProducts ?? []);
  }, []);

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
