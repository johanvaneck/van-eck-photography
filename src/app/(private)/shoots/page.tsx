import { Suspense } from "react";
import { ShootsTable } from "./components/shoots-table";

export default async function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ShootsTable />
    </Suspense>
  );
}
