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
import { Category } from "@/lib/db/types";
import { eq } from "drizzle-orm";
import { EditIcon } from "lucide-react";
import { revalidatePath } from "next/cache";
import Form from "next/form";

export function EditCategoryDialog({ category }: { category: Category }) {
  const handleSubmit = async (formData: FormData) => {
    "use server";
    const nameForm = formData.get("name");
    if (!nameForm) {
      console.error("Name is required");
      return;
    }
    const name = nameForm.toString();
    await db
      .update(categoriesTable)
      .set({
        name,
      })
      .where(eq(categoriesTable.id, category.id));

    revalidatePath("/categories");
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <EditIcon /> Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Category</DialogTitle>
          <DialogDescription>
            Fill out the form to modify the category.
          </DialogDescription>
        </DialogHeader>
        <Form action={handleSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">Name</Label>
              <Input id="name-1" name="name" defaultValue={category.name} />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <FormButton text="Save" />
            </DialogFooter>
          </div>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
