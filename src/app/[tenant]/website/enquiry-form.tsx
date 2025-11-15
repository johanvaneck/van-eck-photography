"use client";

import { useState, useTransition } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { submitEnquiry } from "./actions/enquiry";
import { CategorySelect } from "@/app/app/shoots/create/category-select";

export function EnquiryForm({ submitEnquiryAction, userId, categories }: { submitEnquiryAction: typeof submitEnquiry, userId: string, categories: Array<{ id: string, name: string }> }) {
  const [status, setStatus] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus(null);
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const categoryId = formData.get("category_id") as string;
    const dateOfInterest = formData.get("dateOfInterest") as string;
    const message = formData.get("message") as string;
    startTransition(async () => {
      try {
        await submitEnquiryAction({ name, email, categoryId, dateOfInterest, message, userId });
        setStatus("Thank you for your enquiry!");
        (e.currentTarget as HTMLFormElement).reset();
      } catch {
        setStatus("Something went wrong. Please try again.");
      }
    });
  }

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Contact / Enquiry</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              type="text"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="category">Category</Label>
            <CategorySelect categories={categories} />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="dateOfInterest">Date of Interest</Label>
            <Input
              id="dateOfInterest"
              name="dateOfInterest"
              type="date"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              name="message"
              required
            />
          </div>
          <Button type="submit" disabled={isPending}>
            {isPending ? <Spinner className="w-4 h-4 mr-2 inline-block" /> : "Send"}
          </Button>
          {status && <p className="mt-4 text-center text-green-600">{status}</p>}
        </form>
      </CardContent>
    </Card>
  );
}
