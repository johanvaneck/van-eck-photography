"use client";
import { useState } from "react";
import { Shoot } from "@/lib/db/types";
import { updateShoot } from "@/app/actions/shoots";
import { Input } from "@/components/ui/input";

export function EditDepositField({
  shoot,
  updateShootAction,
}: {
  shoot: Shoot;
  updateShootAction: typeof updateShoot;
}) {
  const [value, setValue] = useState(shoot.deposit?.toString() || "");

  const handleBlur = async () => {
    if (value !== (shoot.deposit?.toString() || "")) {
      await updateShootAction({
        ...shoot,
        deposit: value ? parseFloat(value) : undefined,
      });
    }
  };

  return (
    <Input
      type="number"
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
