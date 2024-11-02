"use server";

import { signIn, signOut } from "../_lib/auth";

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
  const { email, password } = data;

  try {
    const routeResponse = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const response = await routeResponse.json();
    if (response.message === "success") {
      return { success: true, message: "Success", user: response.user };
    } else {
      return { success: false, message: "Server error" };
    }
  } catch (error) {
    console.log(error);
    return { success: false, message: "Server error" };
  }
}

export async function logOutSystemAction() {}

export async function signUpSystemAction() {
  try {
    return { success: true, message: "Success" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Server error" };
  }
}
