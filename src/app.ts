import e from "express";
import dotenv from "dotenv";
import { studentRouter } from "./routes/students.routes.ts";
dotenv.config({ path: "./.env" });
const app: e.Application = e();
app.use(e.json());
app.use(e.urlencoded({ extended: true }));

app.use("/api/v1/students", studentRouter);

export { app };
