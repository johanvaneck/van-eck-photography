"use client";
import { useState } from "react";
import { Shoot } from "@/lib/db/types";
import { updateShoot } from "@/app/actions/shoots";
import { Input } from "@/components/ui/input";

export function EditStatusField({
    shoot,
    updateShootAction,
}: {
    shoot: Shoot;
    updateShootAction: typeof updateShoot;
}) {
    const [value, setValue] = useState(shoot.status || "");

    const handleBlur = async () => {
        if (value !== shoot.status) {
            await updateShootAction({ ...shoot, status: value });
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
