import CategoriesOptions from "./_components/MainPageComponents/CategoriesOptions";
import FirstMainSection from "./_components/MainPageComponents/FirstMainSection";
import SecondMainSection from "./_components/MainPageComponents/SecondMainSection";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <CategoriesOptions />
      <FirstMainSection />

      <SecondMainSection />
    </div>
  );
}
