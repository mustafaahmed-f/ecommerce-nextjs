import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Cart, Product } from "./cartSlice.types";
import { ICart } from "@/app/cart/_types/CartType";

const initialState: ICart = {
  _id: "",
  userID: "",
  products: [],
  subTotal: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    storeCart: (state: ICart, action: PayloadAction<ICart>) => {
      state._id = action.payload._id;
      state.userID = action.payload.userID;
      state.products = action.payload.products;
      state.subTotal = action.payload.subTotal;
    },

    resetCart: () => {
      return initialState;
    },
  },
});

export const { resetCart, storeCart } = cartSlice.actions;
export default cartSlice.reducer;
