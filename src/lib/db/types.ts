import { categoriesTable, picturesTable, shootsTable, invoicesTable } from "./schema";
export type Invoice = typeof invoicesTable.$inferSelect;
export type CreateInvoice = typeof invoicesTable.$inferInsert;

export type Shoot = typeof shootsTable.$inferSelect;
export type CreateShoot = typeof shootsTable.$inferInsert;

export type Picture = typeof picturesTable.$inferSelect;
export type CreatePicture = typeof picturesTable.$inferInsert;

export type Category = typeof categoriesTable.$inferSelect;
export type CreateCategory = typeof categoriesTable.$inferInsert;
