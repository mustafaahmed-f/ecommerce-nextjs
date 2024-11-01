"use server";

import { NextResponse } from "next/server";
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
    return { success: true, message: "Success", data };
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
