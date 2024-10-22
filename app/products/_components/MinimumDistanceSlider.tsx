import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

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
  //   const [value, setValue] = React.useState<number[]>([10, 50]);

  const handleChange = (
    event: Event,
    newValue: number | number[],
    activeThumb: number
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (Array.isArray(value)) {
      if (activeThumb === 0) {
        setValue([Math.min(newValue[0], value[1] - minDistance), value[1]]);
      } else {
        setValue([value[0], Math.max(newValue[1], value[0] + minDistance)]);
      }
    }
  };

  return (
    <Box sx={{ width: 300 }}>
      <Slider
        getAriaLabel={() => "Minimum distance"}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        min={0}
        className="text-[#4172DC]"
        disableSwap
        max={8000}
        step={10}
      />
    </Box>
  );
}
