import { getCategories } from "@/app/actions/categories";
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
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((category) => (
          <TableRow key={category.id}>
            <TableCell>{category.name}</TableCell>
            <TableCell className="">
              <EditCategoryDialog category={category} />
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
