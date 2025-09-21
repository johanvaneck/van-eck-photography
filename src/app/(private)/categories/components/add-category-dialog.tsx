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
import { db } from "@/lib/db";
import { categoriesTable } from "@/lib/db/schema";
import { PlusIcon } from "lucide-react";
import { nanoid } from "nanoid";
import { revalidatePath } from "next/cache";
import Form from "next/form";

export function AddCategoryDialog() {
  const handleSubmit = async (formData: FormData) => {
    "use server";
    const id = "category_" + nanoid();
    const nameForm = formData.get("name");
    if (!nameForm) {
      console.error("Name is required");
      return;
    }
    const name = nameForm.toString();
    await db.insert(categoriesTable).values({
      id,
      name,
    });
    revalidatePath("/categories");
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
