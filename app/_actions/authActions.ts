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
    console.log("Here");
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
    console.log(response);
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

export async function signUpSystemAction(data: any) {
  try {
    const routeResponse = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const response = await routeResponse.json();
    if (response.message === "success") {
      return { success: true, message: "Account created successfully" };
    } else {
      return { success: false, message: "Server error" };
    }
  } catch (error) {
    console.log(error);
    return { success: false, message: "Server error" };
  }
}
