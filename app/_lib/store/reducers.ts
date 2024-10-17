// store/reducers/index.ts
import { combineReducers } from "redux";
import userReducer from "./slices/userSlice/userSlice";
import cartReducer from "./slices/cartSlice/cartSlice";

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
});

export default rootReducer;
