"use client";
import { useState } from "react";
import { Shoot } from "@/lib/db/types";
import { updateShoot } from "@/app/actions/shoots";
import { Checkbox } from "@/components/ui/checkbox";

export function EditFullyPaidField({ shoot, updateShootAction }: { shoot: Shoot, updateShootAction: typeof updateShoot }) {
    const [value, setValue] = useState(!!shoot.fully_paid);

    const handleChange = async (checked: boolean) => {
        setValue(checked);
            if (checked !== !!shoot.fully_paid) {
                await updateShootAction({ ...shoot, fully_paid: checked });
            }
    };

    return (
        <Checkbox
            checked={value}
            onCheckedChange={handleChange}
            aria-label="Fully Paid"
        />
    );
}
