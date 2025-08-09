"use client";
import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import { LoaderCircleIcon } from "lucide-react";

export function FormButton({
  ...props
}) {
  const status = useFormStatus();
  return (
    <Button
      {...props}
      disabled={status.pending}
      type="submit"
    >
      {status.pending ? <LoaderCircleIcon className="animate-spin" /> : props.text}
    </Button>
  )
}
