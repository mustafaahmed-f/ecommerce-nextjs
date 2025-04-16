// cartSlice.types.ts

export interface Product {
  productID: string; // Assuming ObjectId is represented as a string in TypeScript
  title?: string;
  unitPaymentPrice: number;
  discount?: number;
  quantity: number;
  color?: string | null;
  category?: string | null;
  brand?: string | null;
  image?: string;
}

export interface Cart {
  userID: string; // Assuming ObjectId is represented as a string in TypeScript
  products: Product[];
  subTotal: number;
}
