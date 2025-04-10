import CartPlusIcon from "../_icons/CartPlusIcon";

interface AddToCartBtnProps {}

function AddToCartBtn({}: AddToCartBtnProps) {
  return (
    <div>
      <CartPlusIcon className="cursor-pointer hover:text-sky-500" />
    </div>
  );
}

export default AddToCartBtn;
