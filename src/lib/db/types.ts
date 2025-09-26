import { categoriesTable, picturesTable, shootsTable, invoicesTable, priceListTable, user } from "./schema";

export type PriceListItem = typeof priceListTable.$inferSelect;
export type CreatePriceListItem = typeof priceListTable.$inferInsert;

export type Invoice = typeof invoicesTable.$inferSelect;
export type CreateInvoice = typeof invoicesTable.$inferInsert;

export type Shoot = typeof shootsTable.$inferSelect;
export type CreateShoot = typeof shootsTable.$inferInsert;

export type Picture = typeof picturesTable.$inferSelect;
export type CreatePicture = typeof picturesTable.$inferInsert;

export type Category = typeof categoriesTable.$inferSelect;
export type CreateCategory = typeof categoriesTable.$inferInsert;

export type User = typeof user.$inferSelect;
export type CreateUser = typeof user.$inferInsert;