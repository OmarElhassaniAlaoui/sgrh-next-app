import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const SECRET_KEY =
  process.env.JWT_SECRET ||
  "";

if (!SECRET_KEY) {
  throw new Error("Secret key is not defined");
}
export async function login(
  username: string,
  password: string
): Promise<{ token: string } | null> {
  try {
    console.log("Login attempt with:", { username, password }); // Log input
    const user = await prisma.user.findUnique({
      where: { username },
    });
    console.log("User from DB:", user);

    if (!user) {
      console.log("No user found for username:", username);
      return null;
    }

    const pass = await bcrypt.compare(password, user.password);
    console.log("Password match:", pass);

    if (user && pass) {
      const token = jwt.sign(
        { userId: user.id, username: user.username },
        SECRET_KEY,
        { expiresIn: "1h" }
      );
      console.log("Generated token:", token);
      return { token };
    }
    console.log("Password does not match for user:", username);
    return null;
  } catch (error) {
    console.error("Login error:", error);
    throw new Error("An error occurred during authentication");
  } finally {
    await prisma.$disconnect();
  }
}
