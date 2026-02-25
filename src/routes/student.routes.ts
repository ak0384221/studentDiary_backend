import { Router } from "express";
import {
  getStudentById,
  updateStudent,
} from "../controllers/student.controller.ts";
//
const studentRouter: Router = Router();
studentRouter.route("/:id").get(getStudentById);
studentRouter.route("/").patch(updateStudent);

//
export { studentRouter };
