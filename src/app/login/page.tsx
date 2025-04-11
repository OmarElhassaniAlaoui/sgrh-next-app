"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authenticate } from "@/actions/auth";

export default function LoginPage({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    startTransition(async () => {
      const username = formData.get("username") as string;
      const password = formData.get("password") as string;

      const success = await authenticate(username, password);
      if (success) {
        router.push("/");
      } else {
        setError("Invalid username or password");
      }
    });
  };

  return (
    <div
      className={cn(
        "flex min-h-screen items-center justify-center bg-background",
        className
      )}
      {...props}
    >
      <Card className="overflow-hidden w-full max-w-4xl">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form
            action={handleSubmit}
            className="flex flex-col items-center justify-center p-6 md:p-8"
          >
            <div className="flex flex-col gap-6 w-full max-w-sm">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Bienvenue sur S-G-R-H</h1>
              </div>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder=""
                    required
                    disabled={isPending}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    disabled={isPending}
                  />
                </div>
                {error && <p className="text-destructive text-sm">{error}</p>}
              </div>
              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? "Logging in..." : "Login"}
              </Button>
            </div>
          </form>
          <div className="relative hidden bg-muted md:block">
            <div className="m-10 flex flex-col items-center justify-center h-full">
              <h1 className="text-3xl font-bold text-center">
                Province de Tiznit
              </h1>
              <p className="text-lg text-center">
                Gestion des Ressources Humaines
              </p>
              <img
                src="/assets/images/login_background.png"
                alt="Login Background"
                className="object-contain h-48 w-48 mt-10"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
