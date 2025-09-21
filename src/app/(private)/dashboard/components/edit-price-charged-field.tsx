"use client";
import { useState } from "react";
import { Shoot } from "@/lib/db/types";
import { updateShoot } from "@/app/actions/shoots";
import { Input } from "@/components/ui/input";

export function EditPriceChargedField({ shoot, updateShootAction }: { shoot: Shoot, updateShootAction: typeof updateShoot }) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(shoot.price_charged?.toString() || "");

  const handleBlur = async () => {
    if (value !== (shoot.price_charged?.toString() || "")) {
      await updateShootAction({ ...shoot, price_charged: value ? parseFloat(value) : undefined });
    }
    setEditing(false);
  };

  return editing ? (
    <Input
      autoFocus
      type="number"
      value={value}
      onChange={e => setValue(e.target.value)}
      onBlur={handleBlur}
      onKeyDown={e => {
        if (e.key === "Enter") {
          (e.target as HTMLInputElement).blur();
        }
      }}
      style={{ width: "100%" }}
    />
  ) : (
    <span onDoubleClick={() => setEditing(true)}>{shoot.price_charged}</span>
  );
}
