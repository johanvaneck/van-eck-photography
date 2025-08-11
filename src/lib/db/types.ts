import { photoChunksTable, photosTable, shootsTable } from './schema'

export type Shoot = typeof shootsTable.$inferSelect;
export type CreateShoot = typeof shootsTable.$inferInsert;

export type Photo = typeof photosTable.$inferSelect;
export type CreatePhoto = typeof photosTable.$inferInsert;

export type PhotoChunk = typeof photoChunksTable.$inferSelect;
export type CreatePhotoChunk = typeof photoChunksTable.$inferInsert;
