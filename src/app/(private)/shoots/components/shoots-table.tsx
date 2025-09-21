import { getShoots } from "@/app/actions/shoots";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { routes } from "@/lib/routes";
import { auth } from "@/lib/auth";
import Link from "next/link";
import { headers } from "next/headers";

export async function ShootsTable() {
  const session = await auth.api.getSession({ headers: await headers() });
  const userId = session?.user?.id;
  if (!userId) {
    return <div>Please sign in</div>;
  }
  const { data, error } = await getShoots(userId);
  if (error) {
    console.error(error);
    return <div>Error: {error.message}</div>;
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
          <TableRow key={shoot.id}>
            <TableCell>
              <Link
                className="cursor-pointer"
                href={`${routes.shoots}/${shoot.id}`}
              >
                {shoot.id}
              </Link>
            </TableCell>
            <TableCell>{shoot.name}</TableCell>
            <TableCell>{shoot.categoryId ?? "None"}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
