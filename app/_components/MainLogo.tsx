import Image from "next/image";
import Link from "next/link";

function MainLogo() {
  return (
    <Link href="/">
      <div className="flex flex-row items-center gap-1 sm:gap-2 ">
        <Image
          alt="Luminae logo"
          width={300}
          height={300}
          src="/cart.png"
          className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 -scale-x-100"
        />
        <p className="text-xl font-semibold sm:text-2xl md:text-3xl store-name">
          Luminae
        </p>
      </div>
    </Link>
  );
}

export default MainLogo;
