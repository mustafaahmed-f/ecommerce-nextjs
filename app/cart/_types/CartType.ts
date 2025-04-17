export interface CartProduct {
  productID: number;
  title?: string;
  unitPaymentPrice: number;
  discount?: number;
  quantity: number;
  color?: string | null;
  category?: string | null;
  brand?: string | null;
}

export interface ICart {
  _id?: string; // optional if you're using it after Mongo creates it
  userID: string;
  products: CartProduct[];
  subTotal: number;
  createdAt?: Date;
  updatedAt?: Date;
}
