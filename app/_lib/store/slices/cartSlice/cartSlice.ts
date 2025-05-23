import { ICart } from "@/app/cart/_types/CartType";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const cartInitialState: ICart = {
  _id: "",
  userID: "",
  products: [],
  subTotal: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: cartInitialState,
  reducers: {
    storeCart: (state: ICart, action: PayloadAction<ICart>) => {
      state._id = action.payload._id;
      state.userID = action.payload.userID;
      state.products = action.payload.products;
      state.subTotal = action.payload.subTotal;
    },
  },
});

export const { storeCart } = cartSlice.actions;
export default cartSlice.reducer;
