// store/reducers/index.ts
import { combineReducers } from "redux";
import userReducer from "./slices/userSlice/userSlice";

const rootReducer = combineReducers({
  user: userReducer,
});

export default rootReducer;
