function HomeHeadlines({ headline }: { headline: string }) {
  return (
    <div className="flex flex-row items-center justify-between mb-5">
      <p className="text-lg font-semibold capitalize">{headline}</p>
      <p className="cursor-pointer hover:text-sky-600">View all {">"}</p>
    </div>
  );
}

export default HomeHeadlines;
