import { Router } from "express";
import { getStudents } from "../controllers/student.controller.ts";
//
const studentRouter: Router = Router();
studentRouter.route("/").get(getStudents);
//
export { studentRouter };
