import { db } from "../config/connectDB.ts";
import { students } from "../DB/index.ts";
import { asyncHandler } from "../utils/asyncHandler.ts";

const getStudents = asyncHandler(async (req, res) => {
  const studentList = await db.select().from(students);
  res.status(200).json(studentList);
});

const getStudentById = asyncHandler(async (req, res) => {
  res.status(200).json("welsome to get getStudentById");
});

const createStudent = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;
  if ([name, email, phone].some((key) => !key || key == "")) {
    throw new Error("all fields are required");
  }
  console.log(name, email, phone);
  const created = await db.insert(students).values({
    name,
    email,
    phone,
  });
  res.status(200).json(created);
});
const updateStudent = asyncHandler(async (req, res) => {
  res.status(200).json("welsome to get updateStudent");
});

export { getStudents, getStudentById, createStudent, updateStudent };
