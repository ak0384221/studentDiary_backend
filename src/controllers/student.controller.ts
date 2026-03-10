import { eq } from "drizzle-orm";
import { db } from "../config/connectDB.ts";
import { students } from "../DB/index.ts";
import { asyncHandler } from "../utils/asyncHandler.ts";

const getStudents = asyncHandler(async (req, res) => {
  // hide secretCode field from clients
  const studentList = await db
    .select({
      id: students.id,
      name: students.name,
      email: students.email,
      phone: students.phone,
      service: students.service,
      createdAt: students.createdAt,
    })
    .from(students);
  res.status(200).json(studentList);
});

const getStudentById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new Error("id is required");
  }
  // params may be string or string[]; ensure string
  const sid = Array.isArray(id) ? id[0] : id;
  const result = await db
    .select({
      id: students.id,
      name: students.name,
      email: students.email,
      phone: students.phone,
      service: students.service,
      createdAt: students.createdAt,
    })
    .from(students)
    .where(eq(students.id, sid));
  res.status(200).json(result);
});

const createStudent = asyncHandler(async (req, res) => {
  // frontend should supply name, email, phone, service, secretCode
  let { name, email, phone, service, secretCode } = req.body;
  if (
    [name, email, phone, service, secretCode].some((v) => v == null || v === "")
  ) {
    throw new Error("all fields are required");
  }

  // normalize service value
  service = service.toUpperCase();
  if (service !== "FREE" && service !== "GOLD") {
    service = "FREE"; // fallback
  }

  // if requesting gold, enforce max 5 limit
  if (service === "GOLD") {
    const goldCount = await db
      .select()
      .from(students)
      .where(eq(students.service, "GOLD"));
    if (goldCount.length >= 5) {
      // force to free and inform frontend
      service = "FREE";
    }
  }

  const created = await db
    .insert(students)
    .values({
      name,
      email,
      phone,
      service,
      secretCode,
    })
    .returning();

  res.status(200).json(created);
});
const updateStudent = asyncHandler(async (req, res) => {
  const { id, phone, secretCode } = req.body;

  if ([id, phone, secretCode].some((key) => !key || key == "")) {
    throw new Error("all fields are required");
  }

  // fetch existing student to verify secret code
  const existing = await db.select().from(students).where(eq(students.id, id));

  if (existing.length === 0) {
    throw new Error("student not found");
  }
  if (existing[0].secretCode !== secretCode) {
    // authorization failed
    res.status(401).json({ message: "invalid secret code" });
    return;
  }

  const result = await db
    .update(students)
    .set({ phone })
    .where(eq(students.id, id))
    .returning();

  res.status(200).json(result);
});

export { getStudents, getStudentById, createStudent, updateStudent };
