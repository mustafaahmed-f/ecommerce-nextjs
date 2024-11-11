"use server";

import { signIn, signOut } from "@/app/_lib/auth";
import { instance } from "../_lib/axiosInstance";

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
    const routeResponse = await instance.post("api/login", data, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    // Check if cookie is in the response headers
    const cookie = routeResponse.headers["set-cookie"];

    if (routeResponse.status !== 200) {
      return {
        success: false,
        message: routeResponse.data.error || "Server error",
        details: routeResponse.data,
      };
    }

    // Return the response along with the extracted cookie
    return {
      success: true,
      message: "Logged in successfully!",
      user: routeResponse.data.user,
      cookie, // Pass cookie for server action to set
    };
  } catch (error) {
    console.log(error);
    throw new Error("An unexpected error occurred : " + error);
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
