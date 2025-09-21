import { LoginForm } from "@/components/login-form";

export default function Page() {
  return (
    <div className="flex justify-center items-center min-h-svh w-full">
      <LoginForm className="sm:w-sm md:w-md" type="sign-in" />
    </div>
  );
}
