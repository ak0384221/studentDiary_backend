import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import { app } from "./app.ts";
import cron from "node-cron";
import { connectDB } from "./config/connectDB.ts";
import { sendHWReport } from "./services/sendHomeworksCron.ts";
const PORT = process.env.PORT || 5000;

const required = [
  "NEON_URI",
  "TWILIO_ACCOUNT_SID",
  "TWILIO_AUTH_TOKEN",
  "TWILIO_WHATSAPP_NUMBER",
];
for (let key of required) {
  console.log({ [key]: process.env[key] });
  if (!process.env[key]) {
    throw new Error(`${key} do not found in env`);
  }
}
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log("app is running on port", PORT);

      cron.schedule("0 17 * * *", async () => {
        console.log("Runs every minute");
        try {
          // await sendHWReport(); // <-- wait for async work
          console.log("crone job");
        } catch (err) {
          console.error("sendHWReport failed:", err);
        }
      });
    });
  })

  .catch((error) => console.log("problem while connecting to db", error));
