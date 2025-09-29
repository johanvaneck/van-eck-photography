import { SignInForm } from "@/components/sign-in-form";

export default function Page() {
  return (
    <div className="flex justify-center items-center min-h-svh w-full">
      <SignInForm className="sm:w-sm md:w-md" />
    </div>
  );
}
