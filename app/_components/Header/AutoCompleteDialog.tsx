import ProductSearchResult from "./ProductSearchResult";

interface AutoCompleteDialogProps {
  productsArr: { prodName: string; prodId: number }[];
}

function AutoCompleteDialog({ productsArr }: AutoCompleteDialogProps) {
  return (
    <div
      className="autoCompleteDialog absolute -bottom-0 left-0 z-50 flex max-h-48 w-full translate-y-[104%] flex-col overflow-x-hidden overflow-y-scroll rounded-bl-md rounded-br-md bg-bgGrey sm:max-h-60"
      suppressHydrationWarning
    >
      {!productsArr.length && (
        <p className="px-4 py-3">No results were found.</p>
      )}
      {productsArr.map((el, i) => (
        <ProductSearchResult
          index={i}
          key={el.prodId}
          prodId={el.prodId}
          prodName={el.prodName}
        />
      ))}
    </div>
  );
}

export default AutoCompleteDialog;
