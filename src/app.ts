import e from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
import { homeworkRouter } from "./routes/homework.routes.ts";
import { studentRouter } from "./routes/student.routes.ts";
import { studentsRouter } from "./routes/students.routes.ts";
import { homeworksRouter } from "./routes/homeworks.routes.ts";
import { checkScheduleTask } from "./controllers/homework.controller.ts";
import { sendHWReport } from "./services/sendHomeworksCron.ts";
//
const allowedOrigins = [
  process.env.FRONTEND_URI, // Will be localhost in local .env or Vercel URL in Railway
  "http://localhost:3000", // Optional explicit allowance for local frontend
];
dotenv.config({ path: "./.env" });
const app: e.Application = e();
app.use(e.json());
app.use(e.urlencoded({ extended: true }));
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS: " + origin));
      }
    },
    credentials: true,
  }),
);
//
app.use("/api/v1/students", studentsRouter);
app.use("/api/v1/student", studentRouter);
app.use("/api/v1/homeworks", homeworksRouter);
app.use("/api/v1/homework", homeworkRouter);
app.get("/api/v1/notify", sendHWReport);

export { app };
