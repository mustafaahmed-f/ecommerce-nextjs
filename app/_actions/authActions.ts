"use server";

import { signIn, signOut } from "@/app/_lib/auth";

export async function logInGoogleAction() {
  await signIn("google", { redirectTo: "/" });
}

export async function logOutGoogleAction() {
  await signOut({ redirectTo: "/" });
}

export async function logInSystemAction(data: {
  email: string;
  password: string;
}) {
  try {
    const routeResponse = await fetch(`${process.env.NEXTAUTH_URL}api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!routeResponse.ok) {
      const errorResponse = await routeResponse.json();
      console.error("Server responded with an error:", errorResponse);

      // Trigger custom alert here with errorResponse.error
      return {
        success: false,
        message: errorResponse.error || "Server error",
        details: errorResponse,
      };
    }

    const response = await routeResponse.json();

    if (response.success) {
      return {
        success: true,
        message: "Logged in successfully !",
        user: response.user,
      };
    } else {
      return { success: false, message: "Server error" };
    }
  } catch (error) {
    console.log(error);
    return { success: false, message: "Server error" };
  }
}

export async function logOutSystemAction() {}

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
