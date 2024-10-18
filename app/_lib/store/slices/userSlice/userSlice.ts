import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "./userSlice.types";

// Initial State for userSlice
const initialState: User = {
  userName: "", // Default value for required field
  email: "", // Default value for required field
  firstName: "", // Optional field with default value
  lastName: "", // Optional field with default value
  token: "",
  address: {
    address_line1: "", // Required field, default to empty string
    city: "", // Required field, default to empty string
    country: "", // Required field, default to empty string
    // Optional fields can be left undefined or set to default values
    unit_number: undefined, // Optional
    street_number: undefined, // Optional
    address_line2: undefined, // Optional
    geolocation: {
      lat: undefined, // Optional
      long: undefined, // Optional
    },
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // 1. Sign In - Add user's data to the Redux store
    signIn: (state, action: PayloadAction<User>) => {
      return { ...state, ...action.payload };
    },

    // 2. Update Data - Update any field when modified
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      return {
        ...state,
        ...action.payload,
        address: {
          ...state.address,
          ...action.payload.address,
        },
      };
    },

    // 3. Log Out - Reset the state to initial state
    logOut: () => {
      return initialState;
    },
  },
});

export const { signIn, updateUser, logOut } = userSlice.actions;
export default userSlice.reducer;
