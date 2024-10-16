import { createSlice } from "@reduxjs/toolkit";
import { User } from "./userSlice.types";

// Initial State for userSlice
const initialState: User = {
  userName: "", // Default value for required field
  email: "", // Default value for required field
  firstName: "", // Optional field with default value
  lastName: "", // Optional field with default value
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
  reducers: {},
});

export default userSlice.reducer;
