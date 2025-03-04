"use client";
import { createContext, ReactNode, useContext } from "react";

//===============================================================================
//========================= used for search =====================================
//===============================================================================

interface CategoriesProviderProps {
  children: ReactNode;
  intitialCategories: any;
}

const categoriesContext = createContext<{
  categories: any;
}>({
  categories: [],
});

function CategoriesProvider({
  children,
  intitialCategories,
}: CategoriesProviderProps) {
  return (
    <categoriesContext.Provider value={{ categories: intitialCategories }}>
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
