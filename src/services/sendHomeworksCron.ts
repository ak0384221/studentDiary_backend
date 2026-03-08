import { eq } from "drizzle-orm";
import { db } from "../config/connectDB.ts";
import { homeworks, scheduledJobs, students } from "../DB/index.ts";
import { shapeReminder } from "./shapeReminder.ts";
import { sendWhatsappMessage } from "../utils/sendMsgToWhatsapp.ts";
import type { Request, RequestHandler, Response } from "express";

async function sendHWReport(req: Request, res: Response) {
  const pending_jobs = await db
    .select()
    .from(scheduledJobs)
    .leftJoin(homeworks, eq(homeworks.id, scheduledJobs.homeworkId))
    .leftJoin(students, eq(students.id, homeworks.studentId))
    .where(eq(scheduledJobs.status, "PENDING"));

  if (pending_jobs.length < 1) {
    throw new Error("no pending jobs");
  }

  const formatted = shapeReminder(pending_jobs);
  res.json(formatted);

  try {
    for (const reminder of formatted) {
      await sendWhatsappMessage(reminder.phone, reminder);
    }
    console.log("succesfully sent the messages to whstapp");
  } catch (error) {
    console.log(error);
  }
}
export { sendHWReport };
