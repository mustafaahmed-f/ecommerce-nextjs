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

interface CategoriesProviderProps {
  children: ReactNode;
  intitialCategories: any;
  initialProducts: any[];
}

const categoriesContext = createContext<{
  categories: any;
  products: any[];
  setProducts: React.Dispatch<React.SetStateAction<any[]>>;
  trie: Trie;
  searchVal: string;
  setSearchVal: React.Dispatch<React.SetStateAction<string>>;
  showAutoComplete: boolean;
  setShowAutoComplete: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  categories: [],
  products: [],
  setProducts: () => {},
  trie: new Trie(),
  searchVal: "",
  setSearchVal: () => {},
  showAutoComplete: false,
  setShowAutoComplete: () => {},
});

function CategoriesProvider({
  children,
  intitialCategories,
  initialProducts,
}: CategoriesProviderProps) {
  const { 0: categories } = useState<any[]>(intitialCategories ?? []);
  const { 0: products, 1: setProducts } = useState<any[]>([]);
  const { 0: searchVal, 1: setSearchVal } = useState<string>("");
  const { 0: showAutoComplete, 1: setShowAutoComplete } =
    useState<boolean>(false);
  let trie = new Trie();
  for (let product of products) {
    trie.addProduct(product.title, product.productId);
  }

  useEffect(() => {
    setProducts(initialProducts ?? []);
  }, [initialProducts, setProducts]);

  return (
    <categoriesContext.Provider
      value={{
        categories,
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

export function useCategories() {
  const context = useContext(categoriesContext);
  if (!context) {
    throw new Error(
      "Can't use categories context outside categories provider !!"
    );
  }
  return context;
}

export default CategoriesProvider;
