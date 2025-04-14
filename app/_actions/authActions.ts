"use server";

import { signIn, signOut } from "@/app/_lib/auth";
import { instance } from "../_lib/axiosInstance";

export async function logInGoogleAction() {
  await signIn("google", { redirectTo: "/" });
}

export async function logOutAction(provider: string) {
  // await signOut({ redirectTo: "/" });
  try {
    if (provider === "google") {
      await signOut({ redirect: false });
      return { success: true, message: "Logged out successfully" };
    } else {
      const response = await instance.post("/api/logout", {});
      if (!response.data.success) {
        return {
          success: false,
          message: "Error logging out",
          error: response.data.error,
        };
      }
    }
    return { success: true, message: "Logged out successfully" };
  } catch (error: any) {
    return {
      success: false,
      message: "Error logging out",
      error: error?.message,
    };
  }
}

export async function signUpSystemAction(data: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  userName: string;
  phoneNumber: string;
  profileImage: string;
  address: {
    address_line1: string;
    address_line2: string;
    city: string;
    country: string;
    geolocation: {
      lat: string;
      long: string;
    };
    street_number: string;
    unit_number: string;
  };
}) {
  try {
    const routeResponse = await fetch(`${process.env.NEXTAUTH_URL}api/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: JSON.stringify(data),
    });
    const response = await routeResponse.json();
    if (response.success) {
      return { success: true, message: "Account created successfully" };
    } else {
      console.log(response);
      return { success: false, message: response.error };
    }
  } catch (error) {
    console.log(error);
    return { success: false, message: "Server error" };
  }
}
