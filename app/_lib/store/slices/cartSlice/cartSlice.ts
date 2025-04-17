import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Cart, Product } from "./cartSlice.types";

const initialState: Cart = {
  _id: "",
  userID: "",
  products: [],
  subTotal: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    storeCart: (state: Cart, action: PayloadAction<Cart>) => {
      state._id = action.payload._id;
      state.userID = action.payload.userID;
      state.products = action.payload.products;
      state.subTotal = action.payload.subTotal;
    },
    addProduct: (state, action: PayloadAction<Product>) => {
      const product: Product = action.payload;
      const isExistingProduct = state.products.find(
        (product) => product.productID === product.productID,
      );
      if (isExistingProduct) {
        isExistingProduct.quantity += product.quantity;
      } else {
        state.products.push(product);
      }

      state.subTotal = state.products.reduce(
        (acc, el) => el.quantity * el.unitPaymentPrice + acc,
        0,
      );
    },

    removeProduct: (state: Cart, action: PayloadAction<Product>) => {
      const product: Product = action.payload;
      const isExistingProduct = state.products.find(
        (product) => product.productID === product.productID,
      );
      if (!isExistingProduct) return;
      state.products = state.products.filter(
        (el) => el.productID !== product.productID,
      );
      state.subTotal = state.products.reduce(
        (acc, el) => el.quantity * el.unitPaymentPrice + acc,
        0,
      );
    },

    updateQuantity: (state: Cart, action: PayloadAction<Product>) => {
      const product: Product = action.payload;
      const isExistingProduct = state.products.find(
        (product) => product.productID === product.productID,
      );
      if (!isExistingProduct) return;
      isExistingProduct.quantity = product.quantity;
      state.subTotal = state.products.reduce(
        (acc, el) => el.quantity * el.unitPaymentPrice + acc,
        0,
      );
    },

    resetCart: () => {
      return initialState;
    },
  },
});

export const {
  addProduct,
  removeProduct,
  updateQuantity,
  resetCart,
  storeCart,
} = cartSlice.actions;
export default cartSlice.reducer;
