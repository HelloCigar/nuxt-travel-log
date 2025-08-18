import { int, real, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { locationLog } from "./location-log";
import { user } from "./auth";
import { createInsertSchema } from "drizzle-zod";
import type z from "zod";
import { relations } from "drizzle-orm";

export const locationLogImage = sqliteTable("locationLogImage", {
  id: int().primaryKey({ autoIncrement: true }),
  key: text().notNull(),
  locationLogId: int()
    .notNull()
    .references(() => locationLog.id, { onDelete: "cascade" }),
  userId: int()
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  createdAt: int()
    .notNull()
    .$default(() => Date.now()),
  updatedAt: int()
    .notNull()
    .$default(() => Date.now())
    .$onUpdate(() => Date.now()),
});

export const InsertLocationLogImage = createInsertSchema(locationLogImage, {
  key: field => field.regex(/^\d+\/\d+\/[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}\.jpg$/, "Invalid key"),
}).omit({
  id: true,
  locationLogId: true,
  userId: true,
  createdAt: true,
  updatedAt: true
})

export const locationLogImageRelations = relations(locationLogImage, ({ one }) => ({
  locationLog: one(locationLog, {
    fields: [locationLogImage.locationLogId],
    references: [locationLog.id]
  }),
}))

export type InsertLocationLogImage = z.infer<typeof InsertLocationLogImage>
export type SelectLocationLogImage = typeof locationLogImage.$inferSelect
