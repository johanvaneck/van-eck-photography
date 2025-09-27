"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "../lib/auth/client"; //import the auth client
import { useCallback, useState } from "react";
import { routes } from "@/lib/routes";

export function LoginForm({
  type,
  className,
  ...props
}: React.ComponentProps<"div"> & { type: "sign-up" | "sign-in" }) {
  const [loading, setLoading] = useState(false);
  const isSignUp = type === "sign-up";
  const isSignIn = type === "sign-in";

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoading(true);
      try {
        const formData = new FormData(e.currentTarget);
        const emailStr = formData.get("email");
        const passwordStr = formData.get("password");
        if (!emailStr) {
          alert("Email is required");
          return;
        }
        if (!passwordStr) {
          alert("Password is required");
          return;
        }
        const email = emailStr.toString();
        const password = passwordStr.toString();

        if (isSignUp) {
          const nameStr = formData.get("name");
          if (!nameStr) {
            alert("Name is required");
            return;
          }
          const name = nameStr.toString();
          await authClient.signUp.email(
            {
              email, // user email address
              password, // user password -> min 8 characters by default
              name, // user display name
              callbackURL: routes.signIn, // A URL to redirect to after the user verifies their email (optional)
            },
            {
              onError: (ctx) => {
                // display the error message
                alert(ctx.error.message);
              },
            },
          );
        } else {
          await authClient.signIn.email(
            {
              email, // user email address
              password, // user password -> min 8 characters by default
              callbackURL: routes.dashboard, // A URL to redirect to after the user verifies their email (optional)
            },
            {
              onError: (ctx) => {
                // display the error message
                alert(ctx.error.message);
              },
            },
          );
        }
      } finally {
        setLoading(false);
      }
    },
    [isSignUp],
  );

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>
            {type === "sign-up" ? "Sign Up" : "Sign In"} to your account
          </CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              {isSignUp && (
                <div className="grid gap-3">
                  <Label htmlFor="email">Name</Label>
                  <Input
                    id="name"
                    type="text"
                    name="name"
                    placeholder="John Doe"
                    required
                  />
                </div>
              )}
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" name="password" required />
              </div>
              <div className="flex flex-col gap-3">
                <Button
                  type="submit"
                  className={cn("w-full", loading ? "animate-pulse" : "")}
                  disabled={loading}
                >
                  {isSignUp ? "Sign Up" : "Sign In"}
                </Button>
              </div>
              {isSignIn && (
                <div className="flex gap-4 justify-center items-center">
                  <span>{"Don't have an account?"}</span>
                  <a href={routes.signUp}>Sign Up</a>
                </div>
              )}
              {isSignUp && (
                <div className="flex gap-4 justify-center items-center">
                  <span>{"Already have an account?"}</span>
                  <a href={routes.signIn}>Sign In</a>
                </div>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
