import { CartProduct } from "../cart/_types/CartType";

export function getSubTotal(products: CartProduct[]) {
  return products.reduce((subTotal: number, product: CartProduct) => {
    let finalPrice =
      product.quantity * (product.unitPaymentPrice - product.discount!);
    return subTotal + finalPrice;
  }, 0);
}
