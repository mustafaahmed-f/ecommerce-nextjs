import React from "react";

interface ModelsSectionProps {
  models: string[];
  isSelected?: boolean;
}

function ModelsSection({ models, isSelected = false }: ModelsSectionProps) {
  return (
    <div className="filter-sections">
      <p className="font-semibold">Models</p>
      <div className="flex flex-wrap items-center">
        {models.map((el, i) => (
          <div
            className={`py-1 px-2 border-2 border-[#D9D9D9] rounded-sm m-1 font-semibold${
              isSelected ? "bg-[#D1E2EB]" : ""
            }`}
            key={i}
          >
            {el}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ModelsSection;
