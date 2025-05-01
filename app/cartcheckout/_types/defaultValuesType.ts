import { CartProduct } from "@/app/cart/_types/CartType";

export interface defaultValuesType {
  userID: string;
  userInfo: userInfoType;

  products: CartProduct[];
  subTotal: number;

  couponId?: string | null;

  finalPaidAmount: number;
  paymentMethod: "cash" | "card";

  isFromCart?: boolean;
  notes?: string;
}

export interface userInfoType {
  phoneNumber1: string;
  phoneNumber2: string;
  city: string;
  country: string;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
}
