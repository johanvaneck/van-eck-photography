"use client";
import { useState } from "react";
import { Shoot } from "@/lib/db/types";
import { updateShoot } from "@/app/actions/shoots";
import { Input } from "@/components/ui/input";

export function EditNotesField({ shoot, updateShootAction }: { shoot: Shoot, updateShootAction: typeof updateShoot }) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(shoot.notes || "");

  const handleBlur = async () => {
    if (value !== shoot.notes) {
      await updateShootAction({ ...shoot, notes: value });
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
    <span onDoubleClick={() => setEditing(true)}>{shoot.notes}</span>
  );
}
