"use server";

import { signIn, signOut } from "@/app/_lib/auth";
import { cookies } from "next/headers";

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
      const cookieStore = cookies();
      const token = cookieStore.get("next_ecommerce_token");

      if (!token) {
        return {
          success: false,
          message: "Token not found",
        };
      }

      // Clear the cookie by setting it with maxAge = 0
      cookieStore.set("next_ecommerce_token", "", {
        httpOnly: true,
        path: "/",
        maxAge: 0,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
      });
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
    const routeResponse = await fetch(
      `${process.env.NEXTAUTH_URL}/api/signup`,
      {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: JSON.stringify(data),
      },
    );
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
