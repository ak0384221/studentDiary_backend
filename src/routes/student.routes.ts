import { Router } from "express";
import {
  getStudentById,
  updateStudent,
  getAnalytics,
} from "../controllers/student.controller.ts";
//
const studentRouter: Router = Router();
studentRouter.route("/:id").get(getStudentById);
studentRouter.route("/:studentId/analytics").get(getAnalytics);
studentRouter.route("/").patch(updateStudent);

//
export { studentRouter };
