import { useNextNavigation } from "@/app/_context/NextNavigationProvider";
import { Switch } from "@mui/material";
import { useState } from "react";

interface SortDropListOptionProps {
  text: string;
  descending: string[];
  setDescending: React.Dispatch<React.SetStateAction<string[]>>;
  selected: string[];
  setSelected: React.Dispatch<React.SetStateAction<string[]>>;
  handleSelection: (
    option: string,
    e: React.MouseEvent<HTMLDivElement>,
  ) => void;
}

function SortDropListOption({
  text,
  setDescending,
  selected,
  descending,
  handleSelection,
  setSelected,
}: SortDropListOptionProps) {
  const regex = new RegExp(`^-?${text}$`);
  const { searchParams, pathName, router } = useNextNavigation();
  const [checked, setChecked] = useState(
    descending.some((el) => regex.test(el)),
  ); //// Default ascending; false = ascending, true = descending

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();
    let params = new URLSearchParams(searchParams);
    setChecked(event.target.checked);

    const sortOption = `${event.target.checked ? "-" : ""}${text}`;
    const checkExistenceOfSelection = selected.some((option) =>
      regex.test(option),
    );
    if (checkExistenceOfSelection) {
      const newSelections = [
        ...selected.filter((el) => !regex.test(el)),
        sortOption,
      ];
      params.set("sort", newSelections.join("/"));
      router.replace(`${pathName}?${params.toString()}`);
      setSelected(newSelections);
    }
    if (event.target.checked) {
      setDescending((prev) => [...prev, text]);
    } else {
      setDescending((prev) => prev.filter((item) => item !== text));
    }
  };

  return (
    <div
      className={`flex cursor-pointer items-center justify-between gap-2 hover:bg-slate-300 ${selected.some((select) => regex.test(select)) ? "bg-slate-400" : ""}`}
      onClick={(e: React.MouseEvent<HTMLDivElement>) =>
        handleSelection(text, e)
      }
    >
      <span className="ps-4">{text}</span>
      <div className="flex items-center justify-end">
        <span
          className={`text-xs ${checked ? "text-red-400" : "text-sky-600"}`}
        >
          {checked ? "Desc" : "Asc"}
        </span>
        <Switch
          id="sortSwitch"
          checked={checked}
          onChange={handleChange}
          onClick={(e) => e.stopPropagation()}
          inputProps={{ "aria-label": "controlled" }}
        />
      </div>
    </div>
  );
}

export default SortDropListOption;
