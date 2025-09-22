
import { Input } from "@/components/ui/input";
import Form from "next/form";
import { FormButton } from "@/components/form-button";
import { Label } from "@/components/ui/label";
import { createShoot } from "@/app/actions/shoots";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { CategorySelect } from "./category-select";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { ShootStatus } from "@/lib/enums";


export default async function CreateShootPage({ searchParams }: { searchParams?: Promise<Record<string, string>> }) {
  const params = await searchParams;
  const defaultName = params?.name || "";
  const defaultTime = params?.time || "";
  const defaultLocation = params?.location || "";
  const defaultStatus = params?.status || ShootStatus.Booked;
  const defaultPriceCharged = params?.price_charged || "";
  const defaultNotes = params?.notes || "";
  const defaultCategoryId = params?.category_id || "";

  // Correct headers usage for next.js server actions
  const session = await auth.api.getSession({ headers: await headers() });
  const userId = session?.user?.id;
  if (!userId) {
    return <div>Please sign in</div>;
  }
  const { getCategories } = await import("@/app/actions/categories");
  const { data: categories, error } = await getCategories(userId);
  if (error) {
    return <div>Error loading categories: {error.message}</div>;
  }

  const handleSubmit = async (formData: FormData) => {
    "use server";
    const name = formData.get("name")?.toString() || "";
    const time = formData.get("time")?.toString() || undefined;
    const location = formData.get("location")?.toString() || undefined;
    const status = formData.get("status")?.toString() || undefined;
    const price_charged = formData.get("price_charged") ? parseInt(formData.get("price_charged") as string) : undefined;
    const notes = formData.get("notes")?.toString() || undefined;
    const categoryId = formData.get("category_id")?.toString() || undefined;
    await createShoot({ name, time, location, status, price_charged, notes, userId, categoryId });
  };

  return (
    <div className="flex items-center justify-center">
      <Form className="flex flex-col gap-6 p-8 rounded-lg shadow-lg bg-card w-full max-w-md" action={handleSubmit}>
        <Label htmlFor="name">Name</Label>
        <Input name="name" id="name" required defaultValue={defaultName} />

        <Label htmlFor="time">Time</Label>
        <Input name="time" id="time" type="datetime-local" defaultValue={defaultTime} />

        <Label htmlFor="location">Location</Label>
        <Input name="location" id="location" defaultValue={defaultLocation} />

        <Label htmlFor="status">Status</Label>
        <Select name="status" defaultValue={defaultStatus}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ShootStatus.Booked}>{ShootStatus.Booked}</SelectItem>
            <SelectItem value={ShootStatus.GalleryDelivered}>{ShootStatus.GalleryDelivered}</SelectItem>
          </SelectContent>
        </Select>

        <Label htmlFor="price_charged">Price Charged</Label>
        <Input name="price_charged" id="price_charged" type="number" defaultValue={defaultPriceCharged} />

        <Label htmlFor="notes">Notes</Label>
        <Input name="notes" id="notes" defaultValue={defaultNotes} />

        <Label htmlFor="category_id">Category</Label>
        <CategorySelect defaultValue={defaultCategoryId} categories={categories} />

        <FormButton text="Create Shoot" />
      </Form>
    </div>
  );
}
