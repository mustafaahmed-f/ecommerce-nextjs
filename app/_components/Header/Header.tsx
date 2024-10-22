import { getCategories } from "@/app/_lib/APIs/categoriesAPIs";
import HeadersWrapper from "./HeadersWrapper";

interface HeaderProps {}

async function Header({}: HeaderProps) {
  const categories = await getCategories();
  return (
    <header>
      <HeadersWrapper categories={categories} />
    </header>
  );
}

export default Header;
