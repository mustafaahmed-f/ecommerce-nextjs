import { CartProduct, ICart } from "../cart/_types/CartType";

export function mergeCartsFn(userCart: ICart, offlineCart: ICart): ICart {
  let productMap: Map<number, CartProduct> = new Map();

  for (let p of userCart.products) {
    productMap.set(p.productID, { ...p });
  }

  for (let p of offlineCart.products) {
    if (productMap.has(p.productID)) {
      productMap.set(p.productID, {
        ...productMap.get(p.productID)!,
        quantity: productMap.get(p.productID)!.quantity + p.quantity,
      });
    } else {
      productMap.set(p.productID, { ...p });
    }
  }

  let newProducts: CartProduct[] = Array.from(productMap.values());

  //// Getting new subtotal
  let newSubTotal: number = userCart.subTotal + offlineCart.subTotal;

  let newCart: ICart = {
    userID: userCart.userID,
    products: newProducts,
    subTotal: newSubTotal,
  };

  return newCart;
}
