import { MouseEventHandler } from "react";
import SortDropListOption from "./SortDropListOption";

interface SortDropListProps {
  options: string[];
  descending: string[];
  setDescending: React.Dispatch<React.SetStateAction<string[]>>;
  selected: string[];
  setSelected: React.Dispatch<React.SetStateAction<string[]>>;
  handleSelection: (
    option: string,
    e: React.MouseEvent<HTMLDivElement>,
  ) => void;
}

function SortDropList({
  options,
  setDescending,
  selected,
  descending,
  handleSelection,
  setSelected,
}: SortDropListProps) {
  return (
    <div
      className={`absolute right-0 top-full z-50 mt-1 w-full min-w-fit overflow-hidden rounded-md bg-slate-200`}
      id="sortDropList"
    >
      {options.map((option: string, i: number) => (
        <SortDropListOption
          key={i}
          text={option}
          descending={descending}
          setDescending={setDescending}
          selected={selected}
          setSelected={setSelected}
          handleSelection={handleSelection}
        />
      ))}
    </div>
  );
}

export default SortDropList;
