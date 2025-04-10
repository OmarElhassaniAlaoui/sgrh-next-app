import prisma from "@/lib/prisma";

export async function login(
  username: string,
  password: string
): Promise<boolean> {
  try {
    const user = await prisma.user.findUnique({
      where: { username },
    });

    // Check if user exists and password matches
    // Note: In production, use a hashing library like bcrypt to compare hashed passwords
    if (user && user.password === password) {
      return true;
    }
    return false;
  } catch (error) {
    console.error("Login error:", error);
    throw new Error("An error occurred during authentication");
  } finally {
    await prisma.$disconnect(); // Ensure Prisma disconnects after use
  }
}
