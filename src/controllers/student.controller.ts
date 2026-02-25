import { eq } from "drizzle-orm";
import { db } from "../config/connectDB.ts";
import { students } from "../DB/index.ts";
import { asyncHandler } from "../utils/asyncHandler.ts";

const getStudents = asyncHandler(async (req, res) => {
  const studentList = await db.select().from(students);
  res.status(200).json(studentList);
});

const getStudentById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new Error("id is required");
  }
  const result = await db.select().from(students).where(eq(students.id, id));
  res.status(200).json(result);
});

const createStudent = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;
  if ([name, email, phone].some((key) => !key || key == "")) {
    throw new Error("all fields are required");
  }
  console.log(name, email, phone);
  const created = await db
    .insert(students)
    .values({
      name,
      email,
      phone,
    })
    .returning();

  res.status(200).json(created);
});
const updateStudent = asyncHandler(async (req, res) => {
  const { id, phone } = req.body;

  if ([id, phone].some((key) => !key || key == "")) {
    throw new Error("all fields are required");
  }

  const result = await db
    .update(students)
    .set({ phone })
    .where(eq(students.id, id))
    .returning();

  res.status(200).json(result);
});

export { getStudents, getStudentById, createStudent, updateStudent };
