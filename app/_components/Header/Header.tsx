import { getCategories } from "@/app/_lib/APIs/categoriesAPIs";
import HeadersWrapper from "./HeadersWrapper";
import { getAllProducts } from "@/app/_lib/APIs/productsAPIs";

interface HeaderProps {
  isLoggedIn: any | null;
  provider: string;
}

async function Header({ isLoggedIn = null, provider }: HeaderProps) {
  const { 0: categories, 1: products } = await Promise.all([
    getCategories(),
    getAllProducts(),
  ]);
  return (
    <header>
      <HeadersWrapper categories={categories} products={products} />
    </header>
  );
}

export default Header;
