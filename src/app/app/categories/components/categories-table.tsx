import { getCategories } from "@/app/[tenant]/actions/categories";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AddCategoryDialog } from "./add-category-dialog";
import { EditCategoryDialog } from "./edit-category-dialog";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function CategoriesTable() {
  const session = await auth.api.getSession({ headers: await headers() });
  const userId = session?.user?.id;
  if (!userId) {
    return <div>Please sign in</div>;
  }
  const { data, error } = await getCategories(userId);
  if (error) {
    console.error(error);
    return <div>Error: {error.message}</div>;
  }
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="">Category</TableHead>
          <TableHead className="w-[100px] p-2">
            <AddCategoryDialog />
          </TableHead>
          <TableHead className="w-[100px] p-2 text-right">Delete</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((category) => (
          <TableRow key={category.id}>
            <TableCell>{category.name}</TableCell>
            <TableCell className="">
              <EditCategoryDialog category={category} />
            </TableCell>
            <TableCell className="text-right">
              <Button variant="destructive" size="sm" className="gap-2">
                <TrashIcon className="w-4 h-4" /> Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
