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
    // Update status to PROCESSING
    for (const hw of message.diary) {
      await db
        .update(scheduledJobs)
        .set({ status: "PROCESSING" })
        .where(eq(scheduledJobs.homeworkId, hw.hwId));
    }

    // Create human-readable message instead of JSON
    const homeworkList = message.diary
      .map((hw: any) => {
        const subject = Object.keys(hw).find((key) => key !== "hwId");
        const description = hw[subject!];
        return `📚 ${subject}: ${description}`;
      })
      .join("\n\n");

    const readableMessage = `Hello ${message.name}! 
    

Here are your pending homeworks for ${new Date(message.date).toLocaleDateString()}:

${homeworkList}

Please complete them on time! ⏰
- Student Diary Team`;
    console.log(readableMessage);

    const msg = await client.messages.create({
      body: readableMessage,
      from: process.env.TWILIO_WHATSAPP_NUMBER,
      to: `whatsapp:+88${to}`,
    });

    // Check if message was actually sent successfully
    if (
      msg.status === "queued" ||
      msg.status === "sent" ||
      msg.status === "delivered"
    ) {
      // Update status to DONE only if message was sent
      for (const hw of message.diary) {
        await db
          .update(scheduledJobs)
          .set({
            status: "DONE",
            processedAt: new Date(),
            attempts: 1,
          })
          .where(eq(scheduledJobs.homeworkId, hw.hwId));
      }
      console.log("✅ WhatsApp message sent successfully:", msg.sid);
    } else {
      throw new Error(`Message status: ${msg.status}`);
    }
  } catch (err) {
    console.error("❌ Failed to send WhatsApp message:", err);

    // Update status to FAILED
    for (const hw of message.diary) {
      await db
        .update(scheduledJobs)
        .set({
          status: "FAILED",
          lastError: err instanceof Error ? err.message : "Unknown error",
          attempts: 1,
        })
        .where(eq(scheduledJobs.homeworkId, hw.hwId));
    }
  }
}
export { sendWhatsappMessage };
