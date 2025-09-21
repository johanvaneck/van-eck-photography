import { Input } from "@/components/ui/input";
import Form from "next/form";
import { FormButton } from "@/components/form-button";
import { Label } from "@/components/ui/label";
import { createShoot } from "@/app/actions/shoots";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Suspense } from "react";
import { CategorySelect } from "./category-select";

export default function Page() {
  const handleSubmit = async (formData: FormData) => {
    "use server";
    const nameInput = formData.get("name");
    if (!nameInput) {
      alert("Please enter a name");
      return;
    }
    const name = nameInput.toString();
    const session = await auth.api.getSession({ headers: await headers() });
    const userId = session?.user?.id;
    if (!userId) {
      alert("Please sign in");
      return;
    }
    await createShoot({ name, userId });
  };

  return (
    <Form className="flex flex-col gap-4 max-w-md" action={handleSubmit}>
      <Label>Name</Label>
      <Input name="name" required />
      <Suspense fallback={<div>Loading...</div>}>
        <CategorySelect />
      </Suspense>
      <FormButton text="Create Shoot" />
    </Form>
  );
}
