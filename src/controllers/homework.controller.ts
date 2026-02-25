import { db } from "../config/connectDB.ts";
import { homeworks } from "../DB/index.ts";
import { asyncHandler } from "../utils/asyncHandler.ts";

const getHomeworks = asyncHandler(async (req, res) => {
  res.status(200).json("welsome to get homework");
});

const getHomeworkById = asyncHandler(async (req, res) => {
  res.status(200).json("welsome to getHomeworkById");
});

const updateHomework = asyncHandler(async (req, res) => {
  res.status(200).json("welsome to updateHomework");
});

const createHomeworks = asyncHandler(async (req, res) => {
  const { studentId, subject, description } = req.body;
  if ([studentId, subject, description].some((key) => !key || key == "")) {
    throw new Error("student id is required");
  }
  const created = await db
    .insert(homeworks)
    .values({
      studentId,
      subject,
      description,
    })
    .returning();

  res.status(200).json(created);
});

export { getHomeworks, getHomeworkById, updateHomework, createHomeworks };
