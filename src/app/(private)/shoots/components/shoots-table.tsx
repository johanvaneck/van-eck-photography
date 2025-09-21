import { getShoots } from "@/app/actions/shoots"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { routes } from "@/lib/routes"
import Link from "next/link"


export async function ShootsTable() {
  const { data, error } = await getShoots()
  if (error) {
    console.error(error)
    return <div>Error: {error.message}</div>
  }
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[200px]">ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Category ID</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((shoot) => (
          <TableRow key={shoot.id} >
            <TableCell>
              <Link className="cursor-pointer" href={`${routes.shoots}/${shoot.id}`}>
                {shoot.id}
              </Link>
            </TableCell>
            <TableCell>{shoot.name}</TableCell>
            <TableCell>{shoot.categoryId ?? "None"}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
