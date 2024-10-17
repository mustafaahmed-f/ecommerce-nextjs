import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Cart, Product } from "./cartSlice.types";

const initialState: Cart = {
  userID: "",
  products: [],
  subTotal: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    initiateCart: (state: Cart, action: PayloadAction<string>) => {
      state.userID = action.payload;
    },
    addProduct: (state, action: PayloadAction<Product>) => {
      const product: Product = action.payload;
      const isExistingProduct = state.products.find(
        (product) => product.productID === product.productID
      );
      if (isExistingProduct) {
        isExistingProduct.quantity += product.quantity;
      } else {
        state.products.push(product);
      }

      state.subTotal = state.products.reduce(
        (acc, el) => el.quantity * el.unitPaymentPrice + acc,
        0
      );
    },

    removeProduct: (state: Cart, action: PayloadAction<Product>) => {
      const product: Product = action.payload;
      const isExistingProduct = state.products.find(
        (product) => product.productID === product.productID
      );
      if (!isExistingProduct) return;
      state.products = state.products.filter(
        (el) => el.productID !== product.productID
      );
      state.subTotal = state.products.reduce(
        (acc, el) => el.quantity * el.unitPaymentPrice + acc,
        0
      );
    },

    updateQuantity: (state: Cart, action: PayloadAction<Product>) => {
      const product: Product = action.payload;
      const isExistingProduct = state.products.find(
        (product) => product.productID === product.productID
      );
      if (!isExistingProduct) return;
      isExistingProduct.quantity = product.quantity;
      state.subTotal = state.products.reduce(
        (acc, el) => el.quantity * el.unitPaymentPrice + acc,
        0
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
  initiateCart,
} = cartSlice.actions;
export default cartSlice.reducer;
