"use server"; // Marks this file as server-only

import { login } from "@/services/auth";

export async function authenticate(username: string, password: string) {
  const success = await login(username, password);
  return success;
}
