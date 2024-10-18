interface Address {
  unit_number?: number; // Optional since not every user might provide this
  street_number?: number; // Optional
  address_line1: string; // Required
  address_line2?: string; // Optional
  city: string; // Required
  country: string; // Required
  geolocation?: {
    lat?: number; // Optional
    long?: number; // Optional
  };
}

export interface User {
  provider: "" | "system" | "google";
  userName: string; // Required
  email: string; // Required
  firstName: string;
  lastName: string;
  token: string;
  address: Address; // Required
}
