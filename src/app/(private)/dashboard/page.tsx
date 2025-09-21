
import { db } from '@/lib/db';
import { shootsTable } from '@/lib/db/schema';
import { and, gte, lt } from 'drizzle-orm';
import { Shoot } from '@/lib/db/types';
import { format, startOfMonth, endOfMonth, addMonths, subMonths, getDate, parseISO } from 'date-fns';
import MonthNav from './MonthNav';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';

export default async function Page({ searchParams }: { searchParams?: { year?: string; month?: string } }) {
  const now = new Date();
  const year = searchParams?.year ? parseInt(searchParams.year) : now.getFullYear();
  const month = searchParams?.month ? parseInt(searchParams.month) : now.getMonth();
  const start = startOfMonth(new Date(year, month, 1));
  const end = endOfMonth(start);
  const shoots: Shoot[] = await db.select().from(shootsTable)
    .where(and(gte(shootsTable.time, format(start, 'yyyy-MM-dd')), lt(shootsTable.time, format(addMonths(end, 1), 'yyyy-MM-dd'))));

  // Group shoots by day
  const shootsByDay = shoots.reduce((acc, shoot) => {
    const day = shoot.time ? getDate(parseISO(shoot.time)) : '';
    if (!acc[day]) acc[day] = [];
    acc[day].push(shoot);
    return acc;
  }, {} as Record<string, Shoot[]>);

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
          {Object.entries(shootsByDay).map(([day, shoots]) => (
            shoots.map((shoot, idx) => (
              <TableRow key={shoot.id}>
                <TableCell>{idx === 0 ? day : ''}</TableCell>
                <TableCell>{shoot.name}</TableCell>
                <TableCell>{shoot.time}</TableCell>
                <TableCell>{shoot.location}</TableCell>
                <TableCell>{shoot.deposit}</TableCell>
                <TableCell>{shoot.fully_paid ? 'Yes' : 'No'}</TableCell>
                <TableCell>{shoot.status}</TableCell>
                <TableCell>{shoot.price_charged}</TableCell>
                <TableCell>{shoot.notes}</TableCell>
              </TableRow>
            ))
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
