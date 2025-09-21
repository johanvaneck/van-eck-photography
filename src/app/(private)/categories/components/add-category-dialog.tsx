import { FormButton } from "@/components/form-button";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createCategory } from "@/app/actions/categories";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Form from "next/form";
import { PlusIcon } from "lucide-react";

export function AddCategoryDialog() {
  const handleSubmit = async (formData: FormData) => {
    "use server";
    const nameForm = formData.get("name");
    if (!nameForm) {
      console.error("Name is required");
      return;
    }
    const name = nameForm.toString();
    const session = await auth.api.getSession({ headers: await headers() });
    const userId = session?.user?.id;
    if (!userId) {
      console.error("User not found");
      return;
    }
    await createCategory({ name, userId });
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon /> Add
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Category</DialogTitle>
          <DialogDescription>
            Fill out the form to add a new category.
          </DialogDescription>
        </DialogHeader>
        <Form action={handleSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">Name</Label>
              <Input id="name-1" name="name" />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <FormButton text="Add" />
            </DialogFooter>
          </div>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
