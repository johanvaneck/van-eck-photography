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
import { useTenantNameValidation } from "../hooks/use-tenant-name-validation";

export function SignUpForm({ className, ...props }: React.ComponentProps<"div">) {
    const [loading, setLoading] = useState(false);
    const {
        name,
        setName,
        isValid,
        isAvailable,
        checking,
        error: nameError,
    } = useTenantNameValidation();

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
                if (!isValid || !isAvailable) {
                    alert(nameError || "Name is invalid or already taken.");
                    return;
                }
                const email = emailStr.toString();
                const password = passwordStr.toString();
                await authClient.signUp.email(
                    {
                        email,
                        password,
                        name,
                        callbackURL: routes.authSuccess,
                    },
                    {
                        onError: (ctx) => {
                            alert(ctx.error.message);
                        },
                        onSuccess: () => {
                            location.href = routes.authSuccess;
                        },
                    },
                );
            } finally {
                setLoading(false);
            }
        },
        [isValid, isAvailable, name, nameError],
    );

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle>Sign Up to your account</CardTitle>
                    <CardDescription>Create your account to get started</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-3">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    name="name"
                                    placeholder="yourstudio"
                                    required
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                />
                                <span className="text-xs text-gray-500">This will be used for your subdomain (e.g. <strong>yourstudio.pici.sh</strong>)</span>
                                {checking && <span className="text-xs text-blue-500">Checking availability...</span>}
                                {!isAvailable && name && <span className="text-xs text-red-500">This name is already taken.</span>}
                                {!isValid && name && <span className="text-xs text-red-500">Name must be at least 3 characters and contain only lowercase letters, numbers, or hyphens.</span>}
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" name="email" placeholder="m@example.com" required />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="password">Password</Label>
                                <Input id="password" type="password" name="password" required />
                            </div>
                            <div className="flex flex-col gap-3">
                                <Button type="submit" className={cn("w-full", loading ? "animate-pulse" : "")} disabled={loading || !isValid || !isAvailable}>
                                    {loading ? <Spinner className="w-4 h-4 mr-2 inline-block" /> : null}
                                    Sign Up
                                </Button>
                            </div>
                            <div className="flex gap-4 justify-center items-center">
                                <span>{"Already have an account?"}</span>
                                <a href={routes.signIn}>Sign In</a>
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
