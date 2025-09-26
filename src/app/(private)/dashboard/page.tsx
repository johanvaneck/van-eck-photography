import { getShootsByMonth } from "@/app/actions/shoots";
import { Shoot } from "@/lib/db/types";
import { startOfMonth, endOfMonth, getDate, parseISO } from "date-fns";
import MonthNav from "./month-nav";
import {
  Table,
  TableHeader,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import { DashboardTableBody } from "./components/dashboard-table-body";
import { updateShoot } from "@/app/actions/shoots";

export default async function Page({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string>>;
}) {
  const params = searchParams ? await searchParams : {};
  const now = new Date();
  const year = params.year ? parseInt(params.year) : now.getFullYear();
  const month = params.month ? parseInt(params.month) : now.getMonth();
  const start = startOfMonth(new Date(year, month, 1));
  const end = endOfMonth(start);
  const { data: shoots, error } = await getShootsByMonth(start, end);
  if (error) {
    return <div>Error loading shoots: {error.message}</div>;
  }

  // Group shoots by day
  const shootsByDay = shoots.reduce(
    (acc, shoot) => {
      const day = shoot.time ? getDate(parseISO(shoot.time)) : null;
      if (day) {
        if (!acc[day]) acc[day] = [];
        acc[day].push(shoot);
      }
      return acc;
    },
    {} as Record<number, Shoot[]>,
  );

  // Get all days in the month
  const daysInMonth = Array.from({ length: end.getDate() }, (_, i) => i + 1);

  return (
    <div>
      <MonthNav year={year} month={month} />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Day</TableHead>
            <TableHead>Weekday</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Price Charged</TableHead>
            <TableHead>Notes</TableHead>
          </TableRow>
        </TableHeader>
        <DashboardTableBody
          year={year}
          month={month}
          daysInMonth={daysInMonth}
          shootsByDay={shootsByDay}
          updateShootAction={updateShoot}
        />
      </Table>
    </div>
  );
}
