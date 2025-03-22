interface SortPillsProps {
  children: React.ReactNode;
}

function SortPills({ children }: SortPillsProps) {
  return (
    <div className="flex items-center justify-center rounded-xl border border-[#7B7B7B] p-1 text-sm text-[#555555]">
      {children}
    </div>
  );
}

export default SortPills;
