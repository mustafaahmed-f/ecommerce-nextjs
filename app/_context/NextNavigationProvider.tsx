import {
  ReadonlyURLSearchParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { createContext, useContext } from "react";

interface NextNavigationProviderProps {
  children: React.ReactNode;
}

const nextNavigateContext = createContext<{
  searchParams: URLSearchParams;
  pathName: string;
  router: any;
}>({
  searchParams: new URLSearchParams(),
  pathName: "",
  router: {},
});

function NextNavigationProvider({ children }: NextNavigationProviderProps) {
  let searchParams = useSearchParams();
  let pathName = usePathname();
  let router = useRouter();
  return (
    <nextNavigateContext.Provider value={{ searchParams, pathName, router }}>
      {children}
    </nextNavigateContext.Provider>
  );
}

export function useNextNavigation() {
  const context = useContext(nextNavigateContext);
  if (!context) {
    throw new Error(
      "Can't use nextNavigateContext outside NextNavigationProvider !!"
    );
  }
  return context;
}

export default NextNavigationProvider;
