import { db } from "@/lib/db";
import { shootsTable } from "@/lib/db/schema"
import { desc } from "drizzle-orm"
import { Fragment } from "react";

export default async function Page() {
  const shoots = await db
    .select()
    .from(shootsTable)
    .orderBy(desc(shootsTable.updatedAt));

  return <div className="grid grid-cols-3 gap-4">
    <div className="text-gray-500">ID</div>
    <div className="text-gray-500">Name</div>
    <div className="text-gray-500">Category ID</div>
    {shoots.map((shoot) => (
      <Fragment key={shoot.id}>
        <div>{shoot.id}</div>
        <div>{shoot.name}</div>
        <div>{shoot.categoryId}</div>
      </Fragment>
    ))}
  </div>
}
