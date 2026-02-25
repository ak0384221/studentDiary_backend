import { Router } from "express";
import {
  createStudent,
  getStudents,
} from "../controllers/student.controller.ts";
//
const studentsRouter: Router = Router();
studentsRouter.route("/").get(getStudents);
studentsRouter.route("/").post(createStudent);

//
export { studentsRouter };
