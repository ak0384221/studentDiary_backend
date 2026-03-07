import { eq } from "drizzle-orm";
import { db } from "../config/connectDB.ts";
import { homeworks, scheduledJobs, students } from "../DB/index.ts";
import { shapeReminder } from "./shapeReminder.ts";
import { sendWhatsappMessage } from "../utils/sendMsgToWhatsapp.ts";

async function sendHWReport() {
  const pending_jobs = await db
    .select()
    .from(scheduledJobs)
    .leftJoin(homeworks, eq(homeworks.id, scheduledJobs.homeworkId))
    .leftJoin(students, eq(students.id, homeworks.studentId))
    .where(eq(scheduledJobs.status, "PENDING"));

  const formatted = shapeReminder(pending_jobs);
  const reminders = JSON.stringify(formatted, null, 2);
  for (const reminder of reminders) {
    await sendWhatsappMessage(reminder.phone, reminder);
  }
}
export { sendHWReport };
