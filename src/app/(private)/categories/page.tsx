
import { getCategories } from "@/app/actions/categories";
import { Badge } from "@/components/ui/badge";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { AddCategoryDialog } from "./components/add-category-dialog";
import { EditCategoryDialog } from "./components/edit-category-dialog";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function CategoriesPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  const userId = session?.user?.id;
  if (!userId) {
    return <div className="flex items-center justify-center min-h-screen">Please sign in</div>;
  }
  const { data, error } = await getCategories(userId);

  return (
    <div className="w-full min-h-screen">
      <div className="flex items-center justify-between mb-6 px-8 pt-8">
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-bold">Categories</h1>
          <Badge variant="outline" className="ml-2">Pro</Badge>
        </div>
        <AddCategoryDialog />
      </div>
      {error && <div className="text-red-500 mb-4 px-8">Error loading categories: {error.message}</div>}
      {!data || data.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-muted-foreground w-full">
          <svg width="48" height="48" fill="none" viewBox="0 0 24 24" className="mb-4 text-gray-300 dark:text-gray-700"><path d="M7 7V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><rect x="3" y="7" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M16 13h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M12 13h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M8 13h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          <span>No categories found.</span>
        </div>
      ) : (
        <div className="w-full px-8 pb-8">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-left font-medium">Category</TableHead>
                <TableHead className="text-right font-medium"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((category) => (
                <TableRow key={category.id} className="min-h-16">
                  <TableCell className="text-left font-semibold text-base">{category.name}</TableCell>
                  <TableCell className="text-right flex gap-2 justify-end items-center">
                    <EditCategoryDialog category={category} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
