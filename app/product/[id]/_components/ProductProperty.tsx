interface ProductPropertyProps {
  label: string;
  value: string | number | null | undefined;
}

function ProductProperty({ label, value }: ProductPropertyProps) {
  return (
    <>
      <p className="my-auto first-letter:capitalize">{label}:</p>
      <p className="w-fit rounded-md border-[1px] border-black px-1 text-center">
        {value}
      </p>
    </>
  );
}

export default ProductProperty;
