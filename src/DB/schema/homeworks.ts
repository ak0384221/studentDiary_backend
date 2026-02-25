// src/db/schema/diary.ts
import { pgTable, text, timestamp, uuid, pgEnum } from "drizzle-orm/pg-core";
import { students } from "./students.ts";

// 1️⃣ Define Enum for status
export const homeworkStatusEnum = pgEnum("homework_status", [
  "Pending",
  "Completed",
  "Missed",
]);

// 2️⃣ Define table
export const homeworks = pgTable("homeworks", {
  id: uuid("id").defaultRandom().primaryKey(),
  studentId: uuid("student_id")
    .notNull()
    .references(() => students.id),
  subject: text("subject").notNull(),
  description: text("description").notNull(),
  status: homeworkStatusEnum("status") // strict enum
    .default("Pending")
    .notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
