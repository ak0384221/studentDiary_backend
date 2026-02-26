import { and, eq } from "drizzle-orm";
import { db } from "../config/connectDB.ts";
import { homeworks, scheduledJobs, students } from "../DB/index.ts";
import { asyncHandler } from "../utils/asyncHandler.ts";
import { create } from "node:domain";
import { shapeReminder } from "../services/shapeReminder.js";

const getHomeworks = asyncHandler(async (req, res) => {
  const result = await db.select().from(homeworks);
  res.status(200).json(result);
});

const getHomeworkById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id || id == "") {
    throw new Error("id is required");
  }
  const result = await db.select().from(homeworks).where(eq(homeworks.id, id));

  res.status(200).json(result);
});

const updateHomework = asyncHandler(async (req, res) => {
  const { studentId, homeworkId } = req.params;
  const { completed } = req.query;
  const statusValue = completed ? "Completed" : "Missed";
  console.log("q", completed);
  console.log("statusvalue", statusValue);

  if ([studentId, homeworkId].some((key) => !key || key == "")) {
    throw new Error("student id,homework id is required");
  }

  const result = await db
    .update(homeworks)
    .set({
      status: statusValue,
    })
    .where(
      and(eq(homeworks.studentId, studentId), eq(homeworks.id, homeworkId)),
    )
    .returning();
  res.status(200).json(result);
});
const getHomeworksbyStudentId = asyncHandler(async (req, res) => {
  const { studentId } = req.params;
  const result = await db
    .select()
    .from(homeworks)
    .where(eq(homeworks.studentId, studentId));
  res.status(200).json(result);
});

const createHomeworks = asyncHandler(async (req, res) => {
  const { studentId, subject, description } = req.body;
  if ([studentId, subject, description].some((key) => !key || key == "")) {
    throw new Error("student id is required");
  }

  const [created] = await db
    .insert(homeworks)
    .values({
      studentId,
      subject,
      description,
    })
    .returning();

  try {
    await db.insert(scheduledJobs).values({
      homeworkId: created!.id,
      type: "REMINDER",
      scheduledFor: new Date(Date.now() + 15 * 60 * 1000),
    });
    res.status(200).json(created);
  } catch (error) {
    await db.delete(homeworks).where(eq(homeworks.id, created!.id));
    console.log(error);
    res.status(500).json("failed to add");
  }
});

const checkScheduleTask = asyncHandler(async (req, res) => {
  const pending_jobs = await db
    .select()
    .from(scheduledJobs)
    .leftJoin(homeworks, eq(homeworks.id, scheduledJobs.homeworkId))
    .leftJoin(students, eq(students.id, homeworks.studentId))
    .where(eq(scheduledJobs.status, "PENDING"));

  const formatted = shapeReminder(pending_jobs);
  const result = JSON.stringify(formatted, null, 2);

  res.json(formatted);
});

export {
  getHomeworks,
  getHomeworkById,
  updateHomework,
  createHomeworks,
  getHomeworksbyStudentId,
  checkScheduleTask,
};
