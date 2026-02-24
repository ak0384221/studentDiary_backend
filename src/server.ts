import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import { app } from "./app.ts";
import { connectDB } from "./config/connectDB.ts";
const PORT = process.env.PORT || 5000;

const required = ["NEON_URI"];
for (let key of required) {
  console.log({ key: process.env[key] });
  if (!process.env[key]) {
    throw new Error(`${key} do not found in env`);
  }
}
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log("app is running on port", PORT);
    });
  })
  .catch((error) => console.log("problem while connecting to db", error));
