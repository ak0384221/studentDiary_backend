import e from "express";
import dotenv from "dotenv";
import { homeworkRouter } from "./routes/homework.routes.ts";
import { studentRouter } from "./routes/student.routes.ts";
import { studentsRouter } from "./routes/students.routes.ts";
import { homeworksRouter } from "./routes/homeworks.routes.ts";
//
dotenv.config({ path: "./.env" });
const app: e.Application = e();
app.use(e.json());
app.use(e.urlencoded({ extended: true }));
//
app.use("/api/v1/students", studentsRouter);
app.use("/api/v1/student", studentRouter);
app.use("/api/v1/homeworks", homeworksRouter);
app.use("/api/v1/homework", homeworkRouter);

export { app };
