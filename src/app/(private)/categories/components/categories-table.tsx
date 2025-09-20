import { getCategories } from "@/app/actions/categories"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AddCategoryDialog } from "./add-category-dialog"
import { EditCategoryDialog } from "./edit-category-dialog"

export async function CategoriesTable() {
  const { data, error } = await getCategories()
  if (error) {
    console.error(error)
    return <div>Error: {error.message}</div>
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.map((category) => (
        <Card key={category.id} className="flex flex-col items-start p-6 gap-4 shadow-md">
          <Badge variant="outline" className="text-base px-4 py-1 mb-2">{category.name}</Badge>
          <div className="flex gap-2 mt-auto">
            <EditCategoryDialog category={category} />
          </div>
        </Card>
      ))}
      <Card className="flex flex-col items-center justify-center p-6 gap-2 shadow-md border-dashed border-2 border-muted-foreground text-muted-foreground">
        <AddCategoryDialog />
        <span className="text-xs">Add new category</span>
      </Card>
    </div>
  )
}
