import { shootsTable } from './schema'

export type Shoot = typeof shootsTable.$inferSelect;
export type CreateShoot = typeof shootsTable.$inferInsert;
