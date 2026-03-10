// src/db/schema/students.ts
import { pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const serviceStatusEnum = pgEnum("service", ["FREE", "GOLD"]);

export const students = pgTable("students", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  email: text("email").unique().notNull(),
  service: serviceStatusEnum("status").notNull().default("FREE"),
  phone: text("phone").notNull().unique(),
  secretCode: text("secret_code").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});
