import { getShootsByMonth } from "@/app/actions/shoots";
import { Shoot } from "@/lib/db/types";
import { startOfMonth, endOfMonth, getDate, parseISO } from "date-fns";
import { format } from "date-fns";
import MonthNav from "./month-nav";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { EditNameField } from "./components/edit-name-field";
import { EditTimeField } from "./components/edit-time-field";
import { EditLocationField } from "./components/edit-location-field";
import { EditStatusField } from "./components/edit-status-field";
import { EditPriceChargedField } from "./components/edit-price-charged-field";
import { EditNotesField } from "./components/edit-notes-field";
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
        <TableBody>
          {daysInMonth.map((day) => {
            const dateObj = new Date(year, month, day);
            const weekday = format(dateObj, "EEEE");
            const shoots = shootsByDay[day] || [];
            if (shoots.length === 0) {
              return (
                <TableRow className="h-16" key={`empty-${day}`}>
                  <TableCell>{day}</TableCell>
                  <TableCell>{weekday}</TableCell>
                  <TableCell colSpan={6} className="text-muted-foreground text-center">No shoots</TableCell>
                </TableRow>
              );
            }
            return shoots.map((shoot, idx) => (
              <TableRow key={shoot.id}>
                <TableCell>{idx === 0 ? day : ""}</TableCell>
                <TableCell>{idx === 0 ? weekday : ""}</TableCell>
                <TableCell>
                  <EditNameField shoot={shoot} updateShootAction={updateShoot} />
                </TableCell>
                <TableCell>
                  <EditTimeField shoot={shoot} updateShootAction={updateShoot} />
                </TableCell>
                <TableCell>
                  <EditLocationField shoot={shoot} updateShootAction={updateShoot} />
                </TableCell>
                <TableCell>
                  <EditStatusField shoot={shoot} updateShootAction={updateShoot} />
                </TableCell>
                <TableCell>
                  <EditPriceChargedField shoot={shoot} updateShootAction={updateShoot} />
                </TableCell>
                <TableCell>
                  <EditNotesField shoot={shoot} updateShootAction={updateShoot} />
                </TableCell>
              </TableRow>
            ));
          })}
        </TableBody>
      </Table>
    </div>
  );
}
