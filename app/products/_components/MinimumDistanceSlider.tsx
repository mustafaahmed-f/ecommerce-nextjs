import { useNextNavigation } from "@/app/_context/NextNavigationProvider";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import * as React from "react";

function valuetext(value: number) {
  return `$ ${value}`;
}

const minDistance = 10;

export default function MinimumDistanceSlider({
  value,
  setValue,
}: {
  value: number | number[];
  setValue: React.Dispatch<React.SetStateAction<number[]>>;
}) {
  const { searchParams, pathName, router } = useNextNavigation();
  const timeOut = React.useRef<NodeJS.Timeout | null>(null);
  const handleChange = (
    event: Event,
    newValue: number | number[],
    activeThumb: number
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }
    if (timeOut.current) clearTimeout(timeOut.current);
    let params = new URLSearchParams(searchParams);
    if (Array.isArray(value)) {
      if (activeThumb === 0) {
        setValue([Math.min(newValue[0], value[1] - minDistance), value[1]]);
        timeOut.current = setTimeout(() => {
          params.set(
            "priceMin",
            Math.min(newValue[0], value[1] - minDistance).toString()
          );
          params.set("page", "1");
          router.replace(`${pathName}?${params.toString()}`);
        }, 1000);
      } else {
        setValue([value[0], Math.max(newValue[1], value[0] + minDistance)]);
        timeOut.current = setTimeout(() => {
          params.set(
            "priceMax",
            Math.max(newValue[1], value[0] + minDistance).toString()
          );
          params.set("page", "1");
          router.replace(`${pathName}?${params.toString()}`);
        }, 1000);
      }
    }
  };

  return (
    <Box sx={{ width: 220 }}>
      <Slider
        getAriaLabel={() => "Minimum distance"}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        min={0}
        className="text-[#4172DC]"
        disableSwap
        max={10000}
        step={10}
        size="medium"
      />
    </Box>
  );
}
