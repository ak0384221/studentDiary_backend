import Twilio from "twilio";

const client = Twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN,
);

async function sendWhatsappMessage(to: string, message: any) {
  try {
    const msg = await client.messages.create({
      body: message,
      from: process.env.TWILIO_WHATSAPP_NUMBER,
      to: `whatsapp:+88${to}`, // e.g. whatsapp:+8801XXXXXXXXX
    });
    console.log("Message sent:", msg.sid);
  } catch (err) {
    console.error("Failed to send message:", err);
  }
}
export { sendWhatsappMessage };
