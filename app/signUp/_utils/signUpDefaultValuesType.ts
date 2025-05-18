/*  Typed shape of the sign-up form.  Adjust if you change the Yup schema. */

export interface SignupDefaultValuesType {
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  rePassword: string;
  profileImage: string; // URL or CID string
  phoneNumber: string;
  cid: string; // content-id / IPFS cid
  address: {
    unit_number?: number | null;
    street_number?: number | null;
    address_line1?: string | null;
    address_line2?: string | null;
    city?: string | null;
    country?: string | null;
    geolocation?: {
      lat?: number | null;
      long?: number | null;
    };
  };
  provider?: "google" | "system"; // you default to "system" in validation
}
