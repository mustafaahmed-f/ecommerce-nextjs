import { CartProduct } from "@/app/cart/_types/CartType";

export interface defaultValuesType {
  userID: string;
  userInfo: {
    phoneNumbers: string[];
    city: string;
    country: string;
    firstName: string;
    lastName: string;
    email: string;
    address: string;
  };

  products: CartProduct[];
  subTotal: number;

  couponId?: string | null;

  finalPaidAmount: number;
  paymentMethod: "cash" | "card";

  isFromCart?: boolean;
  notes?: string;
}
