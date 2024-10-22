import React, { createContext, ReactNode, useContext } from "react";
import { getCategories } from "../_lib/APIs/categoriesAPIs";

interface CategoriesProviderProps {
  children: ReactNode;
  categories: any;
}

const categoriesContext = createContext({ categories: [] });

function CategoriesProvider({ children, categories }: CategoriesProviderProps) {
  return (
    <categoriesContext.Provider value={categories}>
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
