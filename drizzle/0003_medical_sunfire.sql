CREATE TYPE "public"."homework_status" AS ENUM('Pending', 'Completed', 'Missed');--> statement-breakpoint
ALTER TABLE "homeworks" ALTER COLUMN "status" SET DEFAULT 'Pending'::"public"."homework_status";--> statement-breakpoint
ALTER TABLE "homeworks" ALTER COLUMN "status" SET DATA TYPE "public"."homework_status" USING "status"::"public"."homework_status";--> statement-breakpoint
ALTER TABLE "homeworks" ALTER COLUMN "status" SET NOT NULL;