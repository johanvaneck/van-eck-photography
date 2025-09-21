import { getShootsByMonth } from "@/app/actions/shoots";
import { Shoot } from "@/lib/db/types";
import { startOfMonth, endOfMonth, getDate, parseISO } from "date-fns";
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
import { EditDepositField } from "./components/edit-deposit-field";
import { EditStatusField } from "./components/edit-status-field";
import { EditPriceChargedField } from "./components/edit-price-charged-field";
import { EditNotesField } from "./components/edit-notes-field";
import { EditFullyPaidField } from "./components/edit-fully-paid-field";
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
      const day = shoot.time ? getDate(parseISO(shoot.time)) : "";
      if (!acc[day]) acc[day] = [];
      acc[day].push(shoot);
      return acc;
    },
    {} as Record<string, Shoot[]>,
  );

  return (
    <div>
      <MonthNav year={year} month={month} />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Day</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Deposit</TableHead>
            <TableHead>Fully Paid</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Price Charged</TableHead>
            <TableHead>Notes</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Object.entries(shootsByDay).map(([day, shoots]) =>
            shoots.map((shoot, idx) => (
              <TableRow className="h-16" key={shoot.id}>
                <TableCell>{idx === 0 ? day : ""}</TableCell>
                <TableCell>
                  <EditNameField
                    shoot={shoot}
                    updateShootAction={updateShoot}
                  />
                </TableCell>
                <TableCell>
                  <EditTimeField
                    shoot={shoot}
                    updateShootAction={updateShoot}
                  />
                </TableCell>
                <TableCell>
                  <EditLocationField
                    shoot={shoot}
                    updateShootAction={updateShoot}
                  />
                </TableCell>
                <TableCell>
                  <EditDepositField
                    shoot={shoot}
                    updateShootAction={updateShoot}
                  />
                </TableCell>
                <TableCell>
                  <EditFullyPaidField
                    shoot={shoot}
                    updateShootAction={updateShoot}
                  />
                </TableCell>
                <TableCell>
                  <EditStatusField
                    shoot={shoot}
                    updateShootAction={updateShoot}
                  />
                </TableCell>
                <TableCell>
                  <EditPriceChargedField
                    shoot={shoot}
                    updateShootAction={updateShoot}
                  />
                </TableCell>
                <TableCell>
                  <EditNotesField
                    shoot={shoot}
                    updateShootAction={updateShoot}
                  />
                </TableCell>
              </TableRow>
            )),
          )}
        </TableBody>
      </Table>
    </div>
  );
}
