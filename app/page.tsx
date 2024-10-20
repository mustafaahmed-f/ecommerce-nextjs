import Image from "next/image";
import FirstMainSection from "./_components/MainPageComponents/FirstMainSection";
import SecondMainSection from "./_components/MainPageComponents/SecondMainSection";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <FirstMainSection />
      <SecondMainSection />
    </div>
  );
}
