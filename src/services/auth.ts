import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const SECRET_KEY =
  process.env.JWT_SECRET ||
  "c76fbe221fac570a1eb8d82fa59082d2cb966755d0e2c9a0135109cefc474bf268b97bad808b9318967c2209ea5b2a234f359658b26bad9976d280bd4f4abb256aa9a0d67dce5138a29b294fd7c4078d4f1c83fa35c4b0b879e8e37ef997a2643179071f88834ede8dfe5d31aa9fe3fc5d8636462cae2d9449d6de969bb3122d6dcfce8259e0667980a25c3d196755c7c4c84b7627cd2f2efb8cff76ab268022535bd0d0aba0c580243aa6c0f1e514a953510077c1988a2d0e907a6cdbbba50d0c918d7813f52077c5f36e6eb1a7b34b7d8f16cb3fda6d82113fe4f9558c7279a7a3fc0c8e88d68b27cb5c1f43d6baddb59895b904b4cfb0a53d99b9bb2f2679";

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
