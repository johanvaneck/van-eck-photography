import * as React from "react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getCategories } from "@/app/actions/categories";

export async function CategorySelect({ defaultValue }: { defaultValue?: string }) {
  const session = await auth.api.getSession({ headers: await headers() });
  const userId = session?.user?.id;
  if (!userId) {
    return <div>Please sign in</div>;
  }
  const { data, error } = await getCategories(userId);
  if (error) {
    console.error(error);
    return <div>Error: {error.message}</div>;
  }
  return (
    <Select defaultValue={defaultValue} name="category_id">
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Category" />
      </SelectTrigger>
      <SelectContent>
        {data.map((category) => (
          <SelectItem key={category.id} value={category.id}>
            {category.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
