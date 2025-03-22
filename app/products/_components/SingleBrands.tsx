interface SingleBrandsProps {
  brandName: string;
  checked: boolean;
  onSelect: (brand: string) => void;
}

function SingleBrands({ checked, brandName, onSelect }: SingleBrandsProps) {
  return (
    <div className="flex items-center justify-start gap-3">
      <input
        type="checkbox"
        checked={checked}
        onChange={() => onSelect(brandName)}
        id={`${brandName}`}
        className="cursor-pointer mt-1"
      />
      <label
        htmlFor={`${brandName}`}
        className="text-center cursor-pointer flex content-center"
        style={{ lineHeight: "1.5" }}
      >
        {brandName}
      </label>
    </div>
  );
}

export default SingleBrands;
