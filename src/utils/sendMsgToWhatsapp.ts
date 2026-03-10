import Twilio from "twilio";
import { db } from "../config/connectDB.ts";
import { scheduledJobs } from "../DB/index.ts";
import { eq } from "drizzle-orm";

const client = Twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN,
);

async function sendWhatsappMessage(to: string, message: any) {
  try {
    for (const hw of message.diary) {
      const res = await db
        .update(scheduledJobs)
        .set({ status: "PROCESSING" })
        .where(eq(scheduledJobs.homeworkId, hw.hwId))
        .returning();

      console.log(res);
    }
    const msg = await client.messages.create({
      body: JSON.stringify(message, null, 2),
      from: process.env.TWILIO_WHATSAPP_NUMBER,
      to: `whatsapp:+88${to}`, // e.g. whatsapp:+8801XXXXXXXXX
    });

    for (const hw of message.diary) {
      const res = await db
        .update(scheduledJobs)
        .set({ status: "DONE" })
        .where(eq(scheduledJobs.homeworkId, hw.hwId))
        .returning();

      console.log(res);
    }
    console.error("sent msg", msg);
  } catch (err) {
    for (const hw of message.diary) {
      const res = await db
        .update(scheduledJobs)
        .set({ status: "FAILED", lastError: err.message })
        .where(eq(scheduledJobs.homeworkId, hw.hwId))
        .returning();

      console.log(res);
    }
    console.error("Failed to send message:", err);
  }
}
export { sendWhatsappMessage };
