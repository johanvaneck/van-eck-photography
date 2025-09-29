import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

// Better Auth Schema - START
export const user = sqliteTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(), // Used for subdomains
  email: text("email").notNull().unique(),
  emailVerified: integer("email_verified", { mode: "boolean" })
    .$defaultFn(() => false)
    .notNull(),
  image: text("image"),
  createdAt: integer("created_at", { mode: "timestamp" })
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const session = sqliteTable("session", {
  id: text("id").primaryKey(),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
  token: text("token").notNull().unique(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const account = sqliteTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: integer("access_token_expires_at", {
    mode: "timestamp",
  }),
  refreshTokenExpiresAt: integer("refresh_token_expires_at", {
    mode: "timestamp",
  }),
  scope: text("scope"),
  password: text("password"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});

export const verification = sqliteTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(
    () => /* @__PURE__ */ new Date(),
  ),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(
    () => /* @__PURE__ */ new Date(),
  ),
});
// Better Auth Schema - END

const tableDefaults = {
  id: text("id").primaryKey(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => /* @__PURE__ */ new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => /* @__PURE__ */ new Date()),
  // .$onUpdateFn(() => /* @__PURE__ */ new Date()), TODO: Find a way to do this in sqlite
};

export const categoriesTable = sqliteTable("categories", {
  ...tableDefaults,
  name: text("name").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const shootsTable = sqliteTable("shoots", {
  ...tableDefaults,
  name: text("name").notNull(),
  time: text("time"),
  location: text("location"),
  status: text("status"),
  price_charged: integer("price_charged"),
  notes: text("notes"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  categoryId: text("category_id").references(() => categoriesTable.id, {
    onDelete: "cascade",
  }), // optional
});

export const picturesTable = sqliteTable("pictures", {
  ...tableDefaults,
  s3Path: text("s3_path").notNull(),
  lowResS3Path: text("low_res_s3_path"),
  fileType: text("file_type").notNull(),
  featured: integer("featured", { mode: "boolean" }).default(false).notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  shootId: text("shoot_id")
    .notNull()
    .references(() => shootsTable.id, { onDelete: "cascade" }),
});

export const invoicesTable = sqliteTable("invoices", {
  ...tableDefaults,
  invoiceNumber: text("invoice_number").notNull(),
  date: text("date").notNull(),
  clientName: text("client_name").notNull(),
  description: text("description"),
  amount: integer("amount").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const priceListTable = sqliteTable("price_list", {
  ...tableDefaults,
  title: text("title").notNull(), // e.g. "Wedding Package", "Portrait Session"
  description: text("description"),
  price: integer("price").notNull(), // in cents
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const enquiriesTable = sqliteTable("enquiries", {
  ...tableDefaults,
  name: text("name").notNull(),
  email: text("email").notNull(),
  categoryId: text("category_id")
    .references(() => categoriesTable.id, { onDelete: "set null" }),
  dateOfInterest: text("date_of_interest"),
  message: text("message").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});