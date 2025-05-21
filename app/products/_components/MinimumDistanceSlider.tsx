import { Slider } from "@/app/_components/shadcn/slider";
import { useNextNavigation } from "@/app/_context/NextNavigationProvider";
import * as React from "react";

function valuetext(value: number) {
  return `$ ${value}`;
}

const minDistance = 10;

export default function MinimumDistanceSlider({
  value,
  setValue,
}: {
  value: number[];
  setValue: React.Dispatch<React.SetStateAction<number[]>>;
}) {
  const { searchParams, pathName, router } = useNextNavigation();
  const timeOut = React.useRef<NodeJS.Timeout | null>(null);

  const handleChange = (newValue: number[]) => {
    if (newValue.length !== 2) return;

    // Enforce minDistance
    if (newValue[1] - newValue[0] < minDistance) {
      // If thumbs too close, ignore change
      return;
    }

    if (timeOut.current) clearTimeout(timeOut.current);

    setValue(newValue);

    timeOut.current = setTimeout(() => {
      const params = new URLSearchParams(searchParams);
      params.set("priceMin", newValue[0].toString());
      params.set("priceMax", newValue[1].toString());
      params.set("page", "1");
      router.replace(`${pathName}?${params.toString()}`);
    }, 1000);
  };

  return (
    <div className="mx-auto w-[220px]">
      <Slider
        value={value}
        onValueChange={handleChange}
        min={0}
        max={10000}
        step={10}
        aria-label="Minimum distance"
        className="text-[#4172DC]"
      />
      <p className="mt-4 w-full text-center">
        {valuetext(value[0])} - {valuetext(value[1])}
      </p>
    </div>
  );
}
