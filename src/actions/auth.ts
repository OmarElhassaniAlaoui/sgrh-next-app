"use server";

import { login } from "@/services/auth";
import { cookies } from "next/headers";

export async function authenticate(username: string, password: string) {
  console.log("Authenticate called with:", { username, password });
  const result = await login(username, password);
  console.log("Login result:", result);
  if (result) {
    (await cookies()).set("auth_token", result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600,
      path: "/",
    });
    return true;
  }
  return false;
}
