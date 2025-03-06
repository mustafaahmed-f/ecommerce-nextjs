const colorArray = [
  { colorString: "silver", colorHex: "#C0C0C0" },
  { colorString: "white", colorHex: "#FFFFFF" },
  { colorString: "sand gold", colorHex: "#C2B280" },
  { colorString: "Blue", colorHex: "#0000FF" },
  { colorString: "Black", colorHex: "#000000" },
  { colorString: "Lavender", colorHex: "#E6E6FA" },
  { colorString: "gray", colorHex: "#808080" },
  { colorString: "Burgundy", colorHex: "#800020" },
  { colorString: "steel blue", colorHex: "#4682B4" },
  { colorString: "Smoky Teal", colorHex: "#5F8A8B" },
  { colorString: "Deep Purple", colorHex: "#673AB7" },
  { colorString: "Golden", colorHex: "#FFD700" },
  { colorString: "Green", colorHex: "#008000" },
  { colorString: "Noir Black", colorHex: "#000000" },
  { colorString: "Meteorite Black", colorHex: "#4A4A4A" },
  { colorString: "Aqua Green", colorHex: "#00FFBF" },
  { colorString: "Matte Black", colorHex: "#282828" },
  { colorString: "Taupe", colorHex: "#483C32" },
  { colorString: "Pink", colorHex: "#FFC0CB" },
  { colorString: "dark steel silver", colorHex: "#708090" },
  { colorString: "carbon silver", colorHex: "#A9A9A9" },
  { colorString: "Ceramic Black", colorHex: "#1C1C1C" },
  { colorString: "Pebble Grey", colorHex: "#B0B0B0" },
  { colorString: "Metallic Grey", colorHex: "#A0A0A0" },
  { colorString: "Dark Iron Gray", colorHex: "#525252" },
  { colorString: "ceremic black", colorHex: "#1C1C1C" },
  { colorString: "steel grey", colorHex: "#708090" },
];

export const colorMap: Map<string | null, string | null> = new Map(
  colorArray.map((item) => [item.colorString, item.colorHex])
);
