"use client";
import { Shoot } from "@/lib/db/types";
import { updateShoot } from "@/app/actions/shoots";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { ShootStatus } from "@/lib/enums";

export function EditStatusField({
    shoot,
    updateShootAction,
}: {
    shoot: Shoot;
    updateShootAction: typeof updateShoot;
}) {
    const handleChange = async (val: ShootStatus) => {
        if (val !== shoot.status) {
            await updateShootAction({ ...shoot, status: val });
        }
    };

    return (
        <Select defaultValue={shoot.status ?? undefined} onValueChange={handleChange}>
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value={ShootStatus.Booked}>{ShootStatus.Booked}</SelectItem>
                <SelectItem value={ShootStatus.DepositPaid}>{ShootStatus.DepositPaid}</SelectItem>
                <SelectItem value={ShootStatus.FullyPaid}>{ShootStatus.FullyPaid}</SelectItem>
                <SelectItem value={ShootStatus.GalleryDelivered}>{ShootStatus.GalleryDelivered}</SelectItem>
            </SelectContent>
        </Select>
    );
}
