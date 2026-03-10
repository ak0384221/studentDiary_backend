import { and, eq } from "drizzle-orm";
import { db } from "../config/connectDB.ts";
import { homeworks, scheduledJobs, students } from "../DB/index.ts";
import { asyncHandler } from "../utils/asyncHandler.ts";
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
  if (typeof id != "string") {
    throw new Error("id is must be a string type");
  }
  const result = await db.select().from(homeworks).where(eq(homeworks.id, id));

  res.status(200).json(result);
});

const updateHomework = asyncHandler(async (req, res) => {
  let { studentId, homeworkId } = req.params;
  const { secretCode } = req.body;

  // normalize param values
  studentId = Array.isArray(studentId) ? studentId[0] : studentId;
  homeworkId = Array.isArray(homeworkId) ? homeworkId[0] : homeworkId;

  const { completed } = req.query;
  const statusValue = completed === "true" ? "Completed" : "Missed";

  if ([studentId, homeworkId, secretCode].some((key) => !key || key == "")) {
    throw new Error("student id, homework id and secretCode are required");
  }

  // verify secret code matches the student
  const studentRows = await db
    .select()
    .from(students)
    .where(eq(students.id, studentId));
  if (studentRows.length === 0) {
    throw new Error("student not found");
  }
  if (studentRows[0].secretCode !== secretCode) {
    res.status(401).json({ message: "invalid secret code" });
    return;
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
  if (typeof studentId != "string") {
    throw new Error("studentId  must be a string type");
  }
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

  // Get student to check service type
  const studentRows = await db
    .select()
    .from(students)
    .where(eq(students.id, studentId));

  if (studentRows.length === 0) {
    throw new Error("student not found");
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
    // Only add to scheduled jobs if service is GOLD
    if (studentRows[0].service === "GOLD") {
      await db.insert(scheduledJobs).values({
        homeworkId: created!.id,
        type: "REMINDER",
        scheduledFor: new Date(Date.now() + 15 * 60 * 1000),
      });
    }
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

const updateHomeworkDescription = asyncHandler(async (req, res) => {
  let { id } = req.params;
  const { description, secretCode } = req.body;

  // normalize id
  id = Array.isArray(id) ? id[0] : id;

  if (!id || !description || !secretCode) {
    throw new Error("id, description and secretCode are required");
  }

  // find homework to get studentId
  const hwRows = await db.select().from(homeworks).where(eq(homeworks.id, id));
  if (hwRows.length === 0) {
    throw new Error("homework not found");
  }
  const studentId = hwRows[0].studentId;

  const studentRows = await db
    .select()
    .from(students)
    .where(eq(students.id, studentId));
  if (studentRows.length === 0) {
    throw new Error("student not found");
  }
  if (studentRows[0].secretCode !== secretCode) {
    res.status(401).json({ message: "invalid secret code" });
    return;
  }

  const result = await db
    .update(homeworks)
    .set({ description })
    .where(eq(homeworks.id, id))
    .returning();

  res.status(200).json(result);
});

export {
  getHomeworks,
  getHomeworkById,
  updateHomework,
  createHomeworks,
  getHomeworksbyStudentId,
  checkScheduleTask,
  updateHomeworkDescription,
};
