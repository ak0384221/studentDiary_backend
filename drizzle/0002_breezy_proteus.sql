ALTER TABLE "diary" RENAME TO "homeworks";--> statement-breakpoint
ALTER TABLE "homeworks" DROP CONSTRAINT "diary_student_id_students_id_fk";
--> statement-breakpoint
ALTER TABLE "homeworks" ADD CONSTRAINT "homeworks_student_id_students_id_fk" FOREIGN KEY ("student_id") REFERENCES "public"."students"("id") ON DELETE no action ON UPDATE no action;