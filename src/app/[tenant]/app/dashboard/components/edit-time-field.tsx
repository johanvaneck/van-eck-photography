"use client";
import { useState } from "react";
import { Shoot } from "@/lib/db/types";
import { updateShoot } from "@/app/[tenant]/actions/shoots";
import { Input } from "@/components/ui/input";

export function EditTimeField({
  shoot,
  updateShootAction,
}: {
  shoot: Shoot;
  updateShootAction: typeof updateShoot;
}) {
  const [value, setValue] = useState(shoot.time || "");

  const handleBlur = async () => {
    if (value !== shoot.time) {
      await updateShootAction({ ...shoot, time: value });
    }
  };

  return (
    <Input
      type="datetime-local"
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
