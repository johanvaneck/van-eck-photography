import { categoriesTable, photosTable, shootsTable } from './schema'

export type Shoot = typeof shootsTable.$inferSelect;
export type CreateShoot = typeof shootsTable.$inferInsert;

export type Photo = typeof photosTable.$inferSelect;
export type CreatePhoto = typeof photosTable.$inferInsert;

export type Category = typeof categoriesTable.$inferSelect;
export type CreateCategory = typeof categoriesTable.$inferInsert;
