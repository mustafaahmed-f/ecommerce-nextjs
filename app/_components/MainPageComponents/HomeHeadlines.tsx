import Link from "next/link";

function HomeHeadlines({ headline }: { headline: string }) {
  return (
    <div className="flex flex-row items-center justify-between mb-5">
      <p className="text-lg font-semibold capitalize">{headline}</p>
      <Link href="/products" className="cursor-pointer hover:text-sky-600">
        View all {">"}
      </Link>
    </div>
  );
}

export default HomeHeadlines;
