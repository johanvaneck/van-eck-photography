"use client";
import { format, addMonths, subMonths } from 'date-fns';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function MonthNav({ year, month }: { year: number; month: number }) {
  const router = useRouter();
  const currentDate = new Date(year, month, 1);
  const prev = subMonths(currentDate, 1);
  const next = addMonths(currentDate, 1);
  const now = new Date();
  const isCurrentMonth = now.getFullYear() === year && now.getMonth() === month;

  return (
    <div className="flex justify-between items-center mb-4">
      <span className="font-bold text-lg">{format(currentDate, 'MMMM yyyy')}</span>
      <div className="flex gap-4">
      <Button variant="outline" onClick={() => router.push(`?year=${prev.getFullYear()}&month=${prev.getMonth()}`)}>Previous</Button>
      <Button variant="outline" onClick={() => router.push(`?year=${next.getFullYear()}&month=${next.getMonth()}`)}>Next</Button>
      <Button variant="secondary" disabled={isCurrentMonth} onClick={() => router.push(`?year=${now.getFullYear()}&month=${now.getMonth()}`)} className="ml-2">Today</Button>
      </div>
    </div>
  );
}