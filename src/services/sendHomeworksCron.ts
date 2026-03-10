import { eq, or } from "drizzle-orm";
import { db } from "../config/connectDB.ts";
import { homeworks, scheduledJobs, students } from "../DB/index.ts";
import { shapeReminder } from "./shapeReminder.ts";
import { sendWhatsappMessage } from "../utils/sendMsgToWhatsapp.ts";
import type { Request, Response } from "express";

async function sendHWReport() {
  const pending_jobs = await db
    .select()
    .from(scheduledJobs)
    .leftJoin(homeworks, eq(homeworks.id, scheduledJobs.homeworkId))
    .leftJoin(students, eq(students.id, homeworks.studentId))
    .where(
      or(
        eq(scheduledJobs.status, "PENDING"),
        eq(scheduledJobs.status, "FAILED"),
      ),
    );

  if (pending_jobs.length < 1) {
    throw new Error("no pending jobs");
  }

  const formatted = shapeReminder(pending_jobs);

  try {
    for (const reminder of formatted) {
      await sendWhatsappMessage(reminder.phone, reminder);
    }

    console.log("succesfully sent the messages to whstapp");
    return;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
}
export { sendHWReport };
