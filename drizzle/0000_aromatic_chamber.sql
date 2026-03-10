CREATE TYPE "public"."homework_status" AS ENUM('Pending', 'Completed', 'Missed');--> statement-breakpoint
CREATE TYPE "public"."service" AS ENUM('FREE', 'GOLD');--> statement-breakpoint
CREATE TYPE "public"."job_status" AS ENUM('PENDING', 'PROCESSING', 'DONE', 'FAILED');--> statement-breakpoint
CREATE TYPE "public"."job_type" AS ENUM('REMINDER');--> statement-breakpoint
CREATE TABLE "homeworks" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"student_id" uuid NOT NULL,
	"subject" text NOT NULL,
	"description" text NOT NULL,
	"status" "homework_status" DEFAULT 'Pending' NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "students" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"status" "service" DEFAULT 'FREE' NOT NULL,
	"phone" text NOT NULL,
	"secret_code" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "students_email_unique" UNIQUE("email"),
	CONSTRAINT "students_phone_unique" UNIQUE("phone")
);
--> statement-breakpoint
CREATE TABLE "scheduled_jobs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"type" "job_type" DEFAULT 'REMINDER' NOT NULL,
	"homework_id" uuid NOT NULL,
	"scheduled_for" timestamp NOT NULL,
	"status" "job_status" DEFAULT 'PENDING' NOT NULL,
	"attempts" integer DEFAULT 0 NOT NULL,
	"last_error" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"processed_at" timestamp
);
--> statement-breakpoint
ALTER TABLE "homeworks" ADD CONSTRAINT "homeworks_student_id_students_id_fk" FOREIGN KEY ("student_id") REFERENCES "public"."students"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "scheduled_jobs" ADD CONSTRAINT "scheduled_jobs_homework_id_homeworks_id_fk" FOREIGN KEY ("homework_id") REFERENCES "public"."homeworks"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "status_scheduled_idx" ON "scheduled_jobs" USING btree ("status","scheduled_for");