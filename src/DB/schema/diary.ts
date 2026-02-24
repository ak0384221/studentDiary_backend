// src/db/schema/diary.ts
import {
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
  foreignKey,
} from "drizzle-orm/pg-core";
import { students } from "./students.ts";

export const diary = pgTable("diary", {
  id: uuid("id").defaultRandom().primaryKey(),
  studentId: uuid("student_id")
    .notNull()
    .references(() => students.id),
  subject: text("subject").notNull(),
  description: text("description").notNull(),
  status: varchar("status", { length: 20 }).default("Pending"), // Pending|Completed|Missed
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
