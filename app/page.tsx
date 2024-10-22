import CategoriesOptions from "./_components/Header/CategoriesOptions";
import FirstMainSection from "./_components/MainPageComponents/FirstMainSection";
import SecondMainSection from "./_components/MainPageComponents/SecondMainSection";
import { getAllProducts } from "./_lib/APIs/productsAPIs";

export default async function Home() {
  const products = await getAllProducts();

  return (
    <div className="flex flex-col w-full">
      <CategoriesOptions />
      <FirstMainSection />

      <SecondMainSection products={products} />
    </div>
  );
}
