import {
  pgTable,
  uuid,
  timestamp,
  integer,
  text,
  pgEnum,
  index,
} from "drizzle-orm/pg-core";
import { homeworks } from "./homeworks.ts";

// 🔹 Job Type Enum
export const jobTypeEnum = pgEnum("job_type", ["REMINDER"]);

// 🔹 Job Status Enum
export const jobStatusEnum = pgEnum("job_status", [
  "PENDING",
  "PROCESSING",
  "DONE",
  "FAILED",
]);

export const scheduledJobs = pgTable(
  "scheduled_jobs",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    type: jobTypeEnum("type").notNull().default("REMINDER"),

    homeworkId: uuid("homework_id")
      .notNull()
      .references(() => homeworks.id, { onDelete: "cascade" }),

    scheduledFor: timestamp("scheduled_for").notNull(),

    status: jobStatusEnum("status").notNull().default("PENDING"),

    attempts: integer("attempts").notNull().default(0),

    lastError: text("last_error"),

    createdAt: timestamp("created_at").defaultNow().notNull(),

    processedAt: timestamp("processed_at"),
  },
  (table) => ({
    statusScheduleIdx: index("status_scheduled_idx").on(
      table.status,
      table.scheduledFor,
    ),
  }),
);
