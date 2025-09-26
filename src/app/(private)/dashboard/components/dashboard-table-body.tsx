"use client";
import React, { useEffect, useRef } from "react";
import { format } from "date-fns";
import {
    TableBody,
    TableRow,
    TableCell,
} from "@/components/ui/table";
import { EditNameField } from "./edit-name-field";
import { EditTimeField } from "./edit-time-field";
import { EditLocationField } from "./edit-location-field";
import { EditStatusField } from "./edit-status-field";
import { EditPriceChargedField } from "./edit-price-charged-field";
import { EditNotesField } from "./edit-notes-field";
import { Shoot } from "@/lib/db/types";
import { updateShoot } from "@/app/actions/shoots";

interface DashboardTableBodyProps {
    year: number;
    month: number;
    daysInMonth: number[];
    shootsByDay: Record<number, Shoot[]>;
    updateShootAction: typeof updateShoot;
}

export function DashboardTableBody({
    year,
    month,
    daysInMonth,
    shootsByDay,
    updateShootAction: updateShoot,
}: DashboardTableBodyProps) {
    const today = new Date();
    const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month;
    const currentDay = isCurrentMonth ? today.getDate() : null;
    const rowRefs = useRef<Record<number, HTMLTableRowElement | null>>({});

    useEffect(() => {
        if (currentDay && rowRefs.current[currentDay]) {
            rowRefs.current[currentDay]?.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    }, [currentDay]);

    return (
        <TableBody>
            {daysInMonth.map((day) => {
                const dateObj = new Date(year, month, day);
                const weekday = format(dateObj, "EEEE");
                const shoots = shootsByDay[day] || [];
                const isToday = currentDay === day;
                if (shoots.length === 0) {
                    return (
                        <TableRow
                            className={`h-16 min-h-16 ${isToday ? "bg-blue-50 dark:bg-blue-900/40 rounded-lg shadow-sm transition-all" : ""}`}
                            key={`empty-${day}`}
                            ref={el => { if (isToday) rowRefs.current[day] = el; }}
                        >
                            <TableCell>{day}</TableCell>
                            <TableCell>{weekday}</TableCell>
                            <TableCell colSpan={6} className="text-muted-foreground text-center">No shoots</TableCell>
                        </TableRow>
                    );
                }
                return shoots.map((shoot, idx) => (
                    <TableRow
                        key={shoot.id}
                        className={`h-16 min-h-16 ${isToday && idx === 0 ? "bg-blue-50 dark:bg-blue-900/40 rounded-lg shadow-sm transition-all" : ""}`}
                        ref={el => { if (isToday && idx === 0) rowRefs.current[day] = el; }}
                    >
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
    );
}
