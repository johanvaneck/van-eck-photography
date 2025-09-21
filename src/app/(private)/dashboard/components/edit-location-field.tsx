"use client";
import { useState } from "react";
import { Shoot } from "@/lib/db/types";
import { updateShoot } from "@/app/actions/shoots";
import { Input } from "@/components/ui/input";

export function EditLocationField({ shoot, updateShootAction }: { shoot: Shoot, updateShootAction: typeof updateShoot }) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(shoot.location || "");

  const handleBlur = async () => {
    if (value !== shoot.location) {
      await updateShootAction({ ...shoot, location: value });
    }
    setEditing(false);
  };

  return editing ? (
    <Input
      autoFocus
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
    <span onDoubleClick={() => setEditing(true)}>{shoot.location}</span>
  );
}
