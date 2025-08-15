import { getCategories } from "@/app/actions/categories"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { AddCategoryDialog } from "./add-category-dialog"
import { EditCategoryDialog } from "./edit-category-dialog"

export async function CategoriesTable() {
  const { data, error } = await getCategories()
  if (error) {
    console.error(error)
    return <div>Error: {error.message}</div>
  }
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[200px]">Category</TableHead>
          <TableHead className="w-[100px]">
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
  )
}
