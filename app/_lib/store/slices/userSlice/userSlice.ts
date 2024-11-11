import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "./userSlice.types";

// Initial State for userSlice
const initialState: User = {
  userName: "", // Default value for required field
  email: "", // Default value for required field
  firstName: "", // Optional field with default value
  lastName: "", // Optional field with default value
  phoneNumber: "",
  role: "",
  provider: "",
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
      state.userName = action.payload.userName;
      state.address = action.payload.address;
      state.email = action.payload.email;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.phoneNumber = action.payload.phoneNumber;
      state.provider = action.payload.provider;
    },

    // 2. Update Data - Update any field when modified
    updateUser: (state, action: PayloadAction<User>) => {
      if (action.payload.userName) state.userName = action.payload.userName;
      if (action.payload.address) state.address = action.payload.address;
      if (action.payload.email) state.email = action.payload.email;
      if (action.payload.firstName) state.firstName = action.payload.firstName;
      if (action.payload.lastName) state.lastName = action.payload.lastName;
      if (action.payload.phoneNumber)
        state.phoneNumber = action.payload.phoneNumber;
      if (action.payload.provider) state.provider = action.payload.provider;
    },

    // 3. Log Out - Reset the state to initial state
    logOut: (state) => {
      state.address = initialState.address;
      state.userName = initialState.userName;
      state.email = initialState.email;
      state.firstName = initialState.firstName;
      state.lastName = initialState.lastName;
      state.phoneNumber = initialState.phoneNumber;
      state.provider = initialState.provider;
    },
  },
});

export const { signIn, updateUser, logOut } = userSlice.actions;
export default userSlice.reducer;
