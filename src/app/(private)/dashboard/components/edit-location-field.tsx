"use client";
import { useState } from "react";
import { Shoot } from "@/lib/db/types";
import { updateShoot } from "@/app/actions/shoots";
import { Input } from "@/components/ui/input";

export function EditLocationField({
    shoot,
    updateShootAction,
}: {
    shoot: Shoot;
    updateShootAction: typeof updateShoot;
}) {
    const [value, setValue] = useState(shoot.location || "");

    const handleBlur = async () => {
        if (value !== shoot.location) {
            await updateShootAction({ ...shoot, location: value });
        }
    };

    return (
        <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={(e) => {
                if (e.key === "Enter") {
                    (e.target as HTMLInputElement).blur();
                }
            }}
            style={{ width: "100%" }}
        />
    );
}
