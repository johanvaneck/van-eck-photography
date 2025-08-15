import { Suspense } from "react"
import { CategoriesTable } from "./components/categories-table"

export default async function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CategoriesTable />
    </Suspense>
  )
}
