"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "../lib/auth/client";
import { useCallback, useState } from "react";
import { routes } from "@/lib/routes";
import { Spinner } from "@/components/ui/spinner";

export function SignInForm({ className, ...props }: React.ComponentProps<"div">) {
    const [loading, setLoading] = useState(false);

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
                await authClient.signIn.email(
                    {
                        email,
                        password,
                        callbackURL: routes.authSuccess,
                    },
                    {
                        onError: (ctx) => {
                            alert(ctx.error.message);
                        },
                    },
                );
            } finally {
                setLoading(false);
            }
        },
        [],
    );

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle>Sign In to your account</CardTitle>
                    <CardDescription>Enter your email below to login to your account</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-3">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" name="email" placeholder="m@example.com" required />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="password">Password</Label>
                                <Input id="password" type="password" name="password" required />
                            </div>
                            <div className="flex flex-col gap-3">
                                <Button type="submit" className={cn("w-full", loading ? "animate-pulse" : "")} disabled={loading}>
                                    {loading ? <Spinner className="w-4 h-4 mr-2 inline-block" /> : null}
                                    Sign In
                                </Button>
                            </div>
                            <div className="flex gap-4 justify-center items-center">
                                <span>{"Don't have an account?"}</span>
                                <a href={routes.signUp}>Sign Up</a>
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
